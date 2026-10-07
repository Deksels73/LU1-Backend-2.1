export declare const AdviesService: {
    genereerAdvies(studentId: string): Promise<{
        error: string;
        status: number;
        advies?: never;
    } | {
        error?: never;
        status?: never;
        advies: {
            bookId: string;
            book: {
                Titel: any;
                Auteur: any;
                type: any;
                niveau: any;
                thema: any;
                beschrijving: any;
            } | null;
            reason: string;
        }[];
    }>;
};
//# sourceMappingURL=advies.service.d.ts.map