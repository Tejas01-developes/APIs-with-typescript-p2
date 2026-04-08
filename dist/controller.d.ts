import { Request, Response } from "express";
type body = {
    name: string;
    email: string;
    password: string;
};
export declare const insertuser: (req: Request<{}, {}, body>, resp: Response) => Promise<Response<any, Record<string, any>>>;
type loginbody = {
    email: string;
    password: string;
};
export declare const login: (req: Request<{}, {}, loginbody>, resp: Response) => Promise<Response<any, Record<string, any>>>;
interface cookieid extends Request {
    id?: string;
}
export declare const uploadfile: (req: cookieid, resp: Response) => Promise<Response<any, Record<string, any>>>;
export declare const displayfile: (req: Request, resp: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=controller.d.ts.map