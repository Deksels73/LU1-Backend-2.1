export declare const LeeslijstRepository: {
    add(studentId: string, bookId: string): Promise<{
        success: boolean;
    }>;
    exists(studentId: string, bookId: string): Promise<boolean>;
    get(studentId: string): Promise<{
        id: number;
        studentId: string;
        bookId: string;
        gelezen: boolean | null;
    }[]>;
    update(studentId: string, id: number, gelezen: boolean): Promise<{
        success: boolean;
    }>;
    remove(studentId: string, id: number): Promise<{
        success: boolean;
    }>;
};
//# sourceMappingURL=leeslijst.repository.d.ts.map