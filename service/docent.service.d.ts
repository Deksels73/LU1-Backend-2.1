export declare const DocentService: {
    getStudents(teacherId: number): Promise<{
        id: number | null;
        name: string | null;
        code: string | null;
    }[]>;
    heeftStudent(teacherId: number, studentId: string | number): Promise<boolean>;
    getLeeslijst(studentId: string): Promise<{
        id: number;
        studentId: string;
        bookId: string;
        gelezen: boolean | null;
        book: {
            Titel: any;
            Auteur: any;
            type: any;
            niveau: any;
            thema: any;
            beschrijving: any;
        } | null;
    }[]>;
    addBook(studentId: string, bookId: string): Promise<{
        success: boolean;
    } | {
        error: string;
        status: number;
    }>;
};
//# sourceMappingURL=docent.service.d.ts.map