import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

// const{
//     MYSQL_HOST,
//     MYSQL_PORT,
//     MYSQL_DB,
//     MYSQL_PASS,
//     MYSQL_ROOT
// }=process.env;

// if(!MYSQL_DB || !MYSQL_HOST || !MYSQL_PASS || !MYSQL_PORT || !MYSQL_ROOT){
//     throw Error("no process env found")
// }



export const db=mysql.createPool({
    host:process.env.MYSQL_HOST as string,
    port:Number(process.env.MYSQL_PORT),
    database:process.env.MYSQL_DB as string,
    password:process.env.MYSQL_PASS as string,
    user:process.env.MYSQL_ROOT as string

})