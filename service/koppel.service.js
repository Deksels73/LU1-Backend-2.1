import { TeacherRepository } from "../repositories/teacher.repository.js";
import { StudentRepository } from "../repositories/student.repository.js";
export const KoppelService = {
    async getDocenten() {
        return await TeacherRepository.getAll();
    },
    async getMijnDocent(studentId) {
        return await StudentRepository.getTeacher(studentId);
    },
    async kiesDocent(studentId, teacherId) {
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
//# sourceMappingURL=koppel.service.js.map