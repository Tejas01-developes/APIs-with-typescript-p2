import { db } from "./dbconnection/mysqlconnection.js";
export const insertusers = async (data) => {
    try {
        const [res] = await db.query('insert into users (id,email,name,password) values (?,?,?,?)', [data.id, data.email, data.name, data.password]);
        return res;
    }
    catch (err) {
        throw new Error("db insert failed");
    }
};
export const getlogindata = async (data) => {
    console.log("entered to get data");
    try {
        const [res] = await db.query('select * from users where email=?', [data.email]);
        return res.length > 0 ? res[0] : null;
    }
    catch (err) {
        throw new Error("no data recived");
    }
};
export const gettkninfo = async (data) => {
    console.log("entered to get token info");
    try {
        const [res] = await db.query('select * from refreshtoken where userid=?', [data.id]);
        return res.length > 0 ? res[0] : null;
    }
    catch (err) {
        throw new Error("no data with the userid");
    }
};
export const updatetkninfo = async (data) => {
    try {
        console.log("entered to update token");
        const [res] = await db.query('update  refreshtoken set token=?,added_at=now(),expired_at=Date_add(now(),interval 7 days)', [data.token]);
        return res.length > 0 ? res[0] : null;
    }
    catch (err) {
        throw new Error("no data with the userid");
    }
};
export const inserttoken = async (data) => {
    console.log("entered to insert token");
    try {
        const [res] = await db.query('insert into refreshtoken (userid,token,added_at,expired_at) values (?,?,now(),date_add(now(),interval 7 day))', [data.userid, data.token]);
        return res.length > 0 ? res[0] : null;
    }
    catch (err) {
        console.log("db insert failed");
        throw new Error("db insert failed");
    }
};
//# sourceMappingURL=service.js.map