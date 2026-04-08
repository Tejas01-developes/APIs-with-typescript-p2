import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// type tkndta={
//     userid:string
// }

export const access=(id:string):string=>{
return jwt.sign(
    {id},
process.env.ACCESS_KEY as string,
{expiresIn:"15m"}
)
}

export const refresh=(id:string):string=>{
    return jwt.sign(
        {id},
    process.env.REFRESH_KEY as string,
    {expiresIn:"7d"}
    )
    }