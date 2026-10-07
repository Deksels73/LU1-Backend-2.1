// import { DocentRepository } from "../repositories/docent.repository.js";
// import { BookRepository } from "../repositories/boek.repository.js";

// export const DocentService = {

//   async getStudents(teacherId: number) {
//     return await DocentRepository.getStudents(teacherId);
//   },

//   async getLeeslijst(studentId: string) {
//     const lijst = await DocentRepository.getLeeslijst(studentId);

//     const enriched = await Promise.all(
//       lijst.map(async (item) => {
//         const book = await BookRepository.getById(item.bookId);
//         return { ...item, book };
//       })
//     );

//     return enriched;
//   },

//   async addBook(studentId: string, bookId: string) {
//     const bestaat = await DocentRepository.exists(studentId, bookId);
//     if (bestaat) {
//       return { error: "Boek staat al in leeslijst", status: 409 };
//     }

//     return await DocentRepository.addBook(studentId, bookId);
//   }
// };
import { DocentRepository } from "../repositories/docent.repository.js";
import { BookRepository } from "../repositories/boek.repository.js";

export const DocentService = {
  async getStudents(teacherId: number) {
    return await DocentRepository.getStudents(teacherId);
  },

  // Hoort deze leerling bij deze docent?
async heeftStudent(teacherId: number, studentId: string | number) {
  const students = await DocentRepository.getStudents(teacherId);
  return students.some((s) => s.id !== null && String(s.id) === String(studentId));
},
  async getLeeslijst(studentId: string) {
    const lijst = await DocentRepository.getLeeslijst(studentId);

    const enriched = await Promise.all(
      lijst.map(async (item) => {
        const book = await BookRepository.getById(item.bookId);
        return { ...item, book };
      })
    );

    return enriched;
  },

  async addBook(studentId: string, bookId: string) {
    const bestaat = await DocentRepository.exists(studentId, bookId);
    if (bestaat) {
      return { error: "Boek staat al in leeslijst", status: 409 };
    }

    return await DocentRepository.addBook(studentId, bookId);
  },
};