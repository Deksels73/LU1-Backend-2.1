import "dotenv/config";
export declare const TeacherRepository: {
    findByName(name: string): Promise<{
        id: number;
        name: string;
        password: string;
        code: string;
    }[]>;
    create(name: string, hashedPassword: string, code: string): Promise<import("pg").QueryResult<never>>;
    getAll(): Promise<{
        id: number;
        name: string;
    }[]>;
    findById(id: number): Promise<{
        id: number;
        name: string;
    } | null>;
};
//# sourceMappingURL=teacher.repository.d.ts.map