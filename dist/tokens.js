import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// type tkndta={
//     userid:string
// }
export const access = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_KEY, { expiresIn: "15m" });
};
export const refresh = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_KEY, { expiresIn: "7d" });
};
//# sourceMappingURL=tokens.js.map