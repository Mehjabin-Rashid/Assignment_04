import {JWT_EXPIRATION_TIME, JWT_SECRET} from "../Config/configbd.js";
import jwt from "jsonwebtoken";

export const TokenEncode = (phoneNumber, User_id) => {
    const KEY = JWT_SECRET;
    const EXPIRE = {expiresIn: JWT_EXPIRATION_TIME}
    const PAYLOAD = {phoneNumber: phoneNumber, User_id: User_id}
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

export const TokenDecode = (token) =>{
    try {
        return jwt.verify(token, JWT_SECRET)
    }catch(err){
        return null 
    }
}