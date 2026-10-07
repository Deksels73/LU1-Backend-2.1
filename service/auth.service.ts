// services/auth.service.ts
import bcrypt from "bcryptjs";
import { TeacherRepository } from "../repositories/teacher.repository.js";
import { StudentRepository } from "../repositories/student.repository.js";

export const AuthService = {
  async register(name: string, password: string, code: string) {
    if (!name || !password || !code) {
      return { error: "Alle velden zijn verplicht.", status: 400 };
    }

    let role = null;
    if (code.startsWith("DOC-")) role = "teacher";
    if (code.startsWith("STU-")) role = "student";

    if (!role) {
      return { error: "Ongeldige code.", status: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      if (role === "teacher") {
        await TeacherRepository.create(name, hashedPassword, code);
      } else {
        await StudentRepository.create(name, hashedPassword, code);
      }

      return { success: true, role };
    } catch (err) {
      console.error(err);
      return { error: "Kon gebruiker niet opslaan.", status: 500 };
    }
  },

  async login(name: string, password: string) {
    if (!name || !password) {
      return { error: "Naam en wachtwoord zijn verplicht.", status: 400 };
    }

    // Teacher check
    const teacherResult = await TeacherRepository.findByName(name);

    if (teacherResult.length > 0) {
      const teacher = teacherResult[0]!;

      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return { error: "Wachtwoord klopt niet.", status: 400 };
      }

      return {
        success: true,
        role: "teacher",
        id: teacher.id,
        name: teacher.name
      };
    }

    // Student check
    const studentResult = await StudentRepository.findByName(name);

    if (studentResult.length > 0) {
      const student = studentResult[0]!;

      const match = await bcrypt.compare(password, student.password);
      if (!match) {
        return { error: "Wachtwoord klopt niet.", status: 401 };
      }

      return {
        success: true,
        role: "student",
        id: student.id,
        name: student.name
      };
    }

    return { error: "Gebruiker niet gevonden.", status: 404 };
  }
};
