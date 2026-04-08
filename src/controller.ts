import { Request, Response, application } from "express"
import { addfile, getfiledta, getlogindata, gettkninfo, inserttoken, insertusers, updatetkninfo } from "./service.js"
import bcrypt from 'bcrypt';
import { taskqueue } from "./backgroundworker/workerqueue.js";
import { access, refresh } from "./tokens.js";
import path from "path";
import fs from 'fs'
import mime from 'mime';

type body={
    name:string,
    email:string,
    password:string
}

export const insertuser=async(req:Request<{},{},body>,resp:Response)=>{
const{name,email,password}=req.body
if(!name || !email || !password){
    return resp.status(400).json({success:false,message:"body not recived"})
}
try{
    const id=crypto.randomUUID();
    const hash=await bcrypt.hash(password,10)
    const insert=await insertusers({id,name,email,password:hash});
    taskqueue.add({
        to:email,
        subject:"welcome mail",
       text: "welcome to our service"
    })
    return resp.status(200).json({success:true,message:"insertion succesfull"})
}catch(err){
    return resp.status(400).json({success:false,message:"insert failed"})
}
}

type loginbody={
email:string,
password:string
}


export const login=async(req:Request<{},{},loginbody>,resp:Response)=>{
const{email,password}=req.body
if(!email || !password){
    return resp.status(400).json({success:false,message:"no body recived"})
}
const getdetails=await getlogindata({email:email});
if(!getdetails){
    return resp.status(400).json({success:false,message:"no data in the array"})
}
const compare=await bcrypt.compare(password,getdetails?.password);
if(!compare){
    return resp.status(400).json({success:false,message:"password is incorrect"})
}
const userid=getdetails.id


const accesstkn=access(userid)
let refreshtkn:string;
try{
const gettkndta=await gettkninfo({id:userid})
if(!gettkndta){
    refreshtkn=refresh(userid)
const inserttkn=await inserttoken({userid:userid,token:refreshtkn})
}else{
const now=Date.now();
const expiredate=gettkndta.expired_at;
if(now > expiredate){
    refreshtkn=refresh(userid)
    const updatetkn=await updatetkninfo({token:refreshtkn})
}else{
    refreshtkn=gettkndta.token
}

}
console.log("entered to set cookie")
resp.cookie("refresh",refreshtkn,{
    httpOnly:true,
    sameSite:"lax",
    secure:true,
    path:"/"
})
return resp.status(200).json({success:true,message:"login succesfully done"})
}catch(err){
    return resp.status(400).json({success:false,message:"login failed"})
}
}

interface cookieid extends Request{
    id?:string
    
}

export const uploadfile=async(req:cookieid,resp:Response)=>{
    if(!req.file){
        return resp.status(400).json({success:false,message:"file not recived"})
    }
    const foldername=process.env.UPLOAD_FOLDER as string
    const filename=req.file.filename;
    const extension=path.extname(req.file.originalname);
    const fileurl=path.join(foldername,filename);
    const id=req.id
    console.log(id);
    if(!id){
        return resp.status(400).json({success:false,message:"no userid recived from cookie filter"})
    }
    try{
        const insertfile=await addfile({userid:id,filename,extension,fileurl});
        return resp.status(200).json({success:true,message:"data set succesfu;lly"})
    }catch(err){
        return resp.status(400).json({success:false,message:"file not recived"})   
     }
}

type bodydata=  Request&{
    userid:string
}

export const displayfile=async(req:Request,resp:Response)=>{
const{userid}=req.body
if(!userid){
    return resp.status(400).json({success:false,message:"no body recived"})
}
try{
const getres=await getfiledta({userid});
if(!getres){
    return resp.status(400).json({success:false,message:"no result in the array"})
}
const url=getres.fileurl
const fileurl=url.replace(/\\/g,"/");
if(!fs.existsSync(fileurl)){
    return resp.status(400).json({success:false,message:"file path is not correct"})
}
const mimetype=mime.getType(fileurl);
if(!mimetype){
    return resp.status(400).json({success:false,message:"mimetype is not avalible"})
}
resp.setHeader("Content-Type",mimetype)
fs.createReadStream(fileurl).pipe(resp)


}catch(err){
    return resp.status(400).json({success:false,message:"getting file data failed"})
}
}