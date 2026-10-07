export declare const AdviesRepository: {
    getProfiel(studentId: string): Promise<{
        id: number;
        studentId: string;
        taalniveau: string;
        genre: string;
        onderwerp: string;
        lengte: string;
        leesdoel: string;
    } | null>;
    saveAdvies(studentId: string, advies: any[]): Promise<void>;
    getAdvies(studentId: string): Promise<{
        id: number;
        studentId: string;
        bookId: string;
        reason: string;
    }[]>;
    deleteAdvies(studentId: string): Promise<void>;
};
//# sourceMappingURL=advies.repository.d.ts.map