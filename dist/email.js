import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const { EMAIL_NAME, EMAIL_PASS } = process.env;
if (!EMAIL_NAME || !EMAIL_PASS) {
    throw new Error("no email and password recived");
}
const createtransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS
    }
});
export const sendmail = async (to, subject, text) => {
    await createtransport.sendMail({
        from: process.env.EMAIL_NAME,
        to: to,
        subject: subject,
        text: text
    });
};
//# sourceMappingURL=email.js.map