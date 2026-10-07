export declare const LeeslijstService: {
    add(studentId: string, book: any): Promise<{
        success: boolean;
    } | {
        error: string;
        status: number;
    }>;
    get(studentId: string): Promise<{
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
    update(studentId: string, id: string, gelezen: boolean): Promise<{
        success: boolean;
    }>;
    remove(studentId: string, id: string): Promise<{
        success: boolean;
    }>;
};
//# sourceMappingURL=leeslijst.service.d.ts.map