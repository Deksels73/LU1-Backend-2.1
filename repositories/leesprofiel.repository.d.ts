export declare const LeesprofielRepository: {
    save(studentId: string, data: {
        genre: string[];
        onderwerp: string[];
        niveau: string;
        lengte: string;
        leesdoel: string;
    }): Promise<import("pg").QueryResult<never>>;
    get(studentId: string): Promise<{
        id: number;
        studentId: string;
        niveau: string;
        genre: any;
        onderwerp: any;
        lengte: string;
        leesdoel: string;
    } | null>;
    update(studentId: string, data: {
        genre: string[];
        onderwerp: string[];
        niveau: string;
        lengte: string;
        leesdoel: string;
    }): Promise<{
        id: number;
        studentId: string;
        niveau: string;
        genre: any;
        onderwerp: any;
        lengte: string;
        leesdoel: string;
    } | null>;
};
//# sourceMappingURL=leesprofiel.repository.d.ts.map