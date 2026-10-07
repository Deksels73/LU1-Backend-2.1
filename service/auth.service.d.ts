export declare const AuthService: {
    register(name: string, password: string, code: string): Promise<{
        error: string;
        status: number;
        success?: never;
        role?: never;
    } | {
        error?: never;
        status?: never;
        success: boolean;
        role: string;
    }>;
    login(name: string, password: string): Promise<{
        success?: never;
        role?: never;
        error: string;
        status: number;
        id?: never;
        name?: never;
    } | {
        error?: never;
        status?: never;
        success: boolean;
        role: string;
        id: number;
        name: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map