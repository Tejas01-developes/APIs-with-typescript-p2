import { RowDataPacket } from "mysql2"
import { db } from "./dbconnection/mysqlconnection.js"


type user={
    id:string
    email:string,
    name:string,
    password:string
}
export const insertusers=async(data:user)=>{
   
try{
   const [res]= await db.query(
        'insert into users (id,email,name,password) values (?,?,?,?)',
        [data.id,data.email,data.name,data.password]
    )
    return res
}catch(err){
     throw new Error("db insert failed")
}
}

type logindta={
    email:string,
   
}

type reciveddta=RowDataPacket&{
    email:string
    id:string,
    password:string,
}

export const getlogindata=async(data:logindta):Promise<reciveddta|null>=>{
    console.log("entered to get data")
try{
    const [res]=await db.query<reciveddta[]>(
        'select * from users where email=?',
        [data.email]
    )
    return res.length > 0 ? res[0]! : null
}catch(err){
    throw new Error("no data recived")
}
}

type tkndta={
    id:string
   
}


type tknres=RowDataPacket&{
    token:string,
    expired_at:number,
    
}
export const gettkninfo=async(data:tkndta):Promise<tknres | null>=>{
    console.log("entered to get token info")
try{
  const [res] =await db.query<tknres[]>(
        'select * from refreshtoken where userid=?',
        [data.id]
    )
    return res.length > 0 ? res[0]! :null
}catch(err){
    throw new Error("no data with the userid")
}
}


type tknupdate={
    token:string
}


export const updatetkninfo=async(data:tknupdate):Promise<RowDataPacket | null>=>
    {
try{
    console.log("entered to update token")
  const [res] =await db.query<RowDataPacket[]>(
        'update  refreshtoken set token=?,added_at=now(),expired_at=Date_add(now(),interval 7 days)',
        [data.token]
    )
    return res.length > 0 ? res[0]! : null 
}catch(err){
    throw new Error("no data with the userid")
}
}



    type inserttkn={
        token:string,
        userid:string,
        
    }
    
    type inserttkndta=RowDataPacket &{
        usrid:string,
        token:string,
        added_at:number,
        expired_at:number
    }
    
    export const inserttoken=async(data:inserttkn):Promise<inserttkndta |null>=>{
        console.log("entered to insert token")
        try{
           const [res]= await db.query<inserttkndta[]>(
                'insert into refreshtoken (userid,token,added_at,expired_at) values (?,?,now(),date_add(now(),interval 7 day))',
                [data.userid,data.token]
            )
            return res.length > 0 ? res[0]! :null
        }catch(err){
            console.log("db insert failed")
             throw new Error("db insert failed")
        }
        }


type filedta={
    filename:string,
    extension:string,
    fileurl:string,
    userid:string
}

        export const addfile=async(data:filedta):Promise<RowDataPacket | null>=>{
const [res]=await db.query<RowDataPacket[]>(
    'insert into imagefolder (userid,filename,extension,fileurl) values (?,?,?,?)',
    [data.userid,data.filename,data.extension,data.fileurl]
)
return res.length > 0 ? res[0]! :null

        }

type filedata={
  userid:string

}

        export const getfiledta=async(data:filedata):Promise<RowDataPacket| null>=>{
            try{
     const [res]=await db.query<RowDataPacket[]>(
                'select * from imagefolder where userid=?',
                [data.userid]
            )
            return res.length > 0 ? res[0]! :null

        }catch(err){
            throw new Error("result fetch failed")
        }
    }