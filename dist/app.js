import express from 'express';
import router from './routes.js';
import './backgroundworker/taskprocess.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/apis", router);
app.listen(3000, () => {
    console.log("server started on the port 3000");
});
//# sourceMappingURL=app.js.map