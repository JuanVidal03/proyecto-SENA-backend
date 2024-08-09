import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export function createAccesToken(payload){
    
    return new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            { expiresIn:"1h" },
            (err,token)=>{
                if (err) reject(err)
                resolve(token)
            }
        )
    })

}