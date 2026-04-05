import { sendmail } from "../email.js";
import { taskqueue } from "./workerqueue.js";
taskqueue.process(async (job) => {
    const { to, subject, text } = job.data;
    console.log("job processing ...");
    await sendmail(to, subject, text);
    console.log("email send");
});
//# sourceMappingURL=taskprocess.js.map