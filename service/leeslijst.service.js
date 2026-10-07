import { LeeslijstRepository } from "../repositories/leeslijst.repository.js";
import { BookRepository } from "../repositories/boek.repository.js";
export const LeeslijstService = {
    async add(studentId, book) {
        const bookId = book._id;
        if (!bookId) {
            return { error: "Boek heeft geen _id", status: 400 };
        }
        const bestaat = await LeeslijstRepository.exists(studentId, bookId);
        if (bestaat) {
            return { error: "Boek staat al in je leeslijst", status: 409 };
        }
        return await LeeslijstRepository.add(studentId, bookId);
    },
    async get(studentId) {
        const lijst = await LeeslijstRepository.get(studentId);
        const books = await Promise.all(lijst.map(async (item) => {
            const book = await BookRepository.getById(item.bookId);
            return { ...item, book };
        }));
        return books;
    },
    async update(studentId, id, gelezen) {
        return await LeeslijstRepository.update(studentId, Number(id), gelezen);
    },
    async remove(studentId, id) {
        return await LeeslijstRepository.remove(studentId, Number(id));
    }
};
//# sourceMappingURL=leeslijst.service.js.map