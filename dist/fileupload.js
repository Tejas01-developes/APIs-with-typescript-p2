import multer from 'multer';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const uploadfolder = process.env.UPLOAD_FOLDER;
if (!fs.existsSync(uploadfolder)) {
    fs.mkdirSync(uploadfolder);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadfolder);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const uniquename = name + "_" + Date.now() + ext;
        cb(null, uniquename);
    }
});
const filefilter = (req, file, cb) => {
    const allowedtype = /jpeg|jpg|png|mp4/;
    const ext = allowedtype.test(path.extname(file.originalname).toLowerCase().replace(".", ""));
    const mimetype = allowedtype.test(file.mimetype);
    if (ext && mimetype) {
        cb(null, true);
    }
    else {
        cb(new Error("only allowed type is uploaded"));
    }
};
export const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 * 1024 },
    fileFilter: filefilter,
});
//# sourceMappingURL=fileupload.js.map