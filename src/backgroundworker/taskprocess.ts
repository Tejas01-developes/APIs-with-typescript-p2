import { Job } from "bull";
import { sendmail } from "../email.js";
import { taskqueue } from "./workerqueue.js";

type emaildata={
    to:string,
    subject:string,
    text:string
}
 taskqueue.process(async(job:Job<emaildata>)=>{

    const{to,subject,text}=job.data
    console.log("job processing ...")
    await sendmail(to,subject,text);
    console.log("email send")
 })