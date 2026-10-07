import { TeacherRepository } from "../repositories/teacher.repository.js";
import { StudentRepository } from "../repositories/student.repository.js";

type Docent = { id: number; name: string };

type KiesDocentResult =
  | { error: string; status: number }
  | { success: true; teacher: Docent };

export const KoppelService = {
  async getDocenten() {
    return await TeacherRepository.getAll();
  },

  async getMijnDocent(studentId: number) {
    return await StudentRepository.getTeacher(studentId);
  },

  async kiesDocent(studentId: number, teacherId: unknown): Promise<KiesDocentResult> {
    if (typeof teacherId !== "number" || !Number.isInteger(teacherId)) {
      return { error: "Ongeldige docent.", status: 400 };
    }

    const teacher = await TeacherRepository.findById(teacherId);
    if (!teacher) {
      return { error: "Docent niet gevonden.", status: 404 };
    }

    await StudentRepository.setTeacher(studentId, teacherId);

    return { success: true, teacher };
  },
};