import { RowDataPacket } from "mysql2";
type user = {
    id: string;
    email: string;
    name: string;
    password: string;
};
export declare const insertusers: (data: user) => Promise<import("mysql2").QueryResult>;
type logindta = {
    email: string;
};
type reciveddta = RowDataPacket & {
    email: string;
    id: string;
    password: string;
};
export declare const getlogindata: (data: logindta) => Promise<reciveddta | null>;
type tkndta = {
    id: string;
};
type tknres = RowDataPacket & {
    token: string;
    expired_at: number;
};
export declare const gettkninfo: (data: tkndta) => Promise<tknres | null>;
type tknupdate = {
    token: string;
};
export declare const updatetkninfo: (data: tknupdate) => Promise<RowDataPacket | null>;
type inserttkn = {
    token: string;
    userid: string;
};
type inserttkndta = RowDataPacket & {
    usrid: string;
    token: string;
    added_at: number;
    expired_at: number;
};
export declare const inserttoken: (data: inserttkn) => Promise<inserttkndta | null>;
export {};
//# sourceMappingURL=service.d.ts.map