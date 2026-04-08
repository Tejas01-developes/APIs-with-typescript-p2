import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const cookiefilter = (req, resp, next) => {
    const refreshcookie = req.cookies.refresh;
    if (!refreshcookie) {
        return resp.status(400).json({ success: false, message: "cokkie not avalible in cookie" });
    }
    try {
        const decode = jwt.verify(refreshcookie, process.env.REFRESH_KEY);
        req.id = decode.id;
        next();
    }
    catch (err) {
        throw new Error("refresh token filter failed");
    }
};
//# sourceMappingURL=cookiefilter.js.map