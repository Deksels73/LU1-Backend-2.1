type Docent = {
    id: number;
    name: string;
};
type KiesDocentResult = {
    error: string;
    status: number;
} | {
    success: true;
    teacher: Docent;
};
export declare const KoppelService: {
    getDocenten(): Promise<{
        id: number;
        name: string;
    }[]>;
    getMijnDocent(studentId: number): Promise<{
        id: number;
        name: string;
    } | null>;
    kiesDocent(studentId: number, teacherId: unknown): Promise<KiesDocentResult>;
};
export {};
//# sourceMappingURL=koppel.service.d.ts.map