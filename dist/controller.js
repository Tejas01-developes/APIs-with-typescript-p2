import { getlogindata, gettkninfo, inserttoken, insertusers, updatetkninfo } from "./service.js";
import bcrypt from 'bcrypt';
import { taskqueue } from "./backgroundworker/workerqueue.js";
import { access, refresh } from "./tokens.js";
export const insertuser = async (req, resp) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return resp.status(400).json({ success: false, message: "body not recived" });
    }
    try {
        const id = crypto.randomUUID();
        const hash = await bcrypt.hash(password, 10);
        const insert = await insertusers({ id, name, email, password: hash });
        taskqueue.add({
            to: email,
            subject: "welcome mail",
            text: "welcome to our service"
        });
        return resp.status(200).json({ success: true, message: "insertion succesfull" });
    }
    catch (err) {
        return resp.status(400).json({ success: false, message: "insert failed" });
    }
};
export const login = async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return resp.status(400).json({ success: false, message: "no body recived" });
    }
    const getdetails = await getlogindata({ email: email });
    if (!getdetails) {
        return resp.status(400).json({ success: false, message: "no data in the array" });
    }
    const compare = await bcrypt.compare(password, getdetails?.password);
    if (!compare) {
        return resp.status(400).json({ success: false, message: "password is incorrect" });
    }
    const useridd = getdetails.id;
    const accesstkn = access({ userid: useridd });
    let refreshtkn;
    try {
        const gettkndta = await gettkninfo({ id: useridd });
        if (!gettkndta) {
            refreshtkn = refresh({ userid: useridd });
            const inserttkn = await inserttoken({ userid: useridd, token: refreshtkn });
        }
        else {
            const now = Date.now();
            const expiredate = gettkndta.expired_at;
            if (now > expiredate) {
                refreshtkn = refresh({ userid: useridd });
                const updatetkn = await updatetkninfo({ token: refreshtkn });
            }
            else {
                refreshtkn = gettkndta.token;
            }
        }
        console.log("entered to set cookie");
        resp.cookie("refresh", refreshtkn, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            path: "/"
        });
        return resp.status(200).json({ success: true, message: "login succesfully done" });
    }
    catch (err) {
        return resp.status(400).json({ success: false, message: "login failed" });
    }
};
//# sourceMappingURL=controller.js.map