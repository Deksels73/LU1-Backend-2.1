export declare const BookRepository: {
    getById(bookId: string): Promise<{
        Titel: any;
        Auteur: any;
        type: any;
        niveau: any;
        thema: any;
        beschrijving: any;
    } | null>;
    getFiltered(filters: any): Promise<import("mongodb").WithId<import("bson").Document>[]>;
};
//# sourceMappingURL=boek.repository.d.ts.map