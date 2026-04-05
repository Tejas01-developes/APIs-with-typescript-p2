import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

const{
EMAIL_NAME,
EMAIL_PASS
}=process.env

if(!EMAIL_NAME || !EMAIL_PASS){
throw new Error("no email and password recived")
}



const createtransport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_NAME,
        pass:process.env.EMAIL_PASS
    }
})


export const sendmail=async(to:string,subject:string,text:string)=>{
   await createtransport.sendMail({
        from:process.env.EMAIL_NAME as string,
        to:to,
        subject:subject,
        text:text
    })

}