import {TokenDecode} from "../Utility/TokenHelper.js";

export default (req, res, next) => {

    // Receive Token
    let token = req.headers['token'];
    if(!token){
        token = req.cookies['token'];
    }

    // Token Decode
    let decoded =TokenDecode(token);

    // Request Header phoneNumber + UserID Add    
    if(decoded === null){
        res.status(401).send({Status: "fail", Message:"Unauthorized"});
    }else{
        // phoneNumber, user_id pick from decoded token
        let phoneNumber = decoded.phoneNumber;
        let user_id = decoded.User_id;

        // phoneNumber, user_id add with request header 
        req.headers.phoneNumber = phoneNumber;
        req.headers.user_id = user_id;

        next();
    }
}