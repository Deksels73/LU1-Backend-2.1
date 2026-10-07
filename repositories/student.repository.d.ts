import "dotenv/config";
export declare const StudentRepository: {
    findByName(name: string): Promise<{
        id: number;
        name: string;
        password: string;
        code: string;
    }[]>;
    create(name: string, hashedPassword: string, code: string): Promise<import("pg").QueryResult<never>>;
    getTeacher(studentId: number): Promise<{
        id: number;
        name: string;
    } | null>;
    setTeacher(studentId: number, teacherId: number): Promise<void>;
};
//# sourceMappingURL=student.repository.d.ts.map