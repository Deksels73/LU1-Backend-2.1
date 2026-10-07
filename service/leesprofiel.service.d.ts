export declare const LeesprofielService: {
    save(studentId: string, body: any): Promise<{
        success?: never;
        error: string;
        status: number;
    } | {
        error?: never;
        status?: never;
        success: boolean;
    }>;
    get(studentId: string): Promise<{
        id: number;
        studentId: string;
        niveau: string;
        genre: any;
        onderwerp: any;
        lengte: string;
        leesdoel: string;
    } | {
        error: string;
        status: number;
    }>;
    update(studentId: string, data: any): Promise<{
        id: number;
        studentId: string;
        niveau: string;
        genre: any;
        onderwerp: any;
        lengte: string;
        leesdoel: string;
    } | null>;
};
//# sourceMappingURL=leesprofiel.service.d.ts.map