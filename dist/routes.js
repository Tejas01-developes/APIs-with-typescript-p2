import express from 'express';
import { insertuser, login } from './controller.js';
const router = express.Router();
router.post("/", insertuser);
router.post("/login", login);
export default router;
//# sourceMappingURL=routes.js.map