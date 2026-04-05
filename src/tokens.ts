import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type tkndta={
    userid:string
}

export const access=(id:tkndta):string=>{
return jwt.sign(
    {id:id},
process.env.ACCESS_KEY as string,
{expiresIn:"15m"}
)
}

export const refresh=(id:tkndta):string=>{
    return jwt.sign(
        {id:id},
    process.env.REFRESH_KEY as string,
    {expiresIn:"7d"}
    )
    }