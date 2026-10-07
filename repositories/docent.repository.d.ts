export declare const DocentRepository: {
    getStudents(teacherId: number): Promise<{
        id: number | null;
        name: string | null;
        code: string | null;
    }[]>;
    getLeeslijst(studentId: string): Promise<{
        id: number;
        studentId: string;
        bookId: string;
        gelezen: boolean | null;
    }[]>;
    exists(studentId: string, bookId: string): Promise<boolean>;
    addBook(studentId: string, bookId: string): Promise<{
        success: boolean;
    }>;
};
//# sourceMappingURL=docent.repository.d.ts.map