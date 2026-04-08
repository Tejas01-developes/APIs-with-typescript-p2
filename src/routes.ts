import express from 'express';
import { displayfile, insertuser, login, uploadfile } from './controller.js';
import { upload } from './fileupload.js';
import { cookiefilter } from './cookiefilter.js';




const router=express.Router();

router.post("/",insertuser);
router.post("/login",login);
router.post("/post",cookiefilter,upload.single("image"),uploadfile);
router.get("/getf",cookiefilter,displayfile)
export default router;