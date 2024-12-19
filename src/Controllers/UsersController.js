import UsersModel from "../Models/UsersModel.js";
import {TokenEncode} from "../Utility/TokenHelper.js";
import SendEmail from "../Utility/EmailHelper.js";

export const Registration = async (req, res) =>{
    try{
        let reqBody = req.body;
        await UsersModel.create(reqBody);
        return res.json({status:"Success", message:"User Registration Successfully"});
    }catch(e){
        return res.json({status:"fail", message:e.toString()});
    };
};

export const Login = async (req, res) =>{
    try{
        let reqBody = req.body;
        let data = await UsersModel.findOne(reqBody);
        if(data === null){
            return res.json({status:"fail", message: "User not found"});
        }else{
            // Login Success Token Encode
            let token = TokenEncode(data['phoneNumber'], data['_id']);
            return res.json({status:"Success", message: "User Login successFully",token:token});
            if(data['status']==="Success"){

                // Cookies Option
                let cookieOption = {expires:new Date(Date.now()+24*6060*1000), httpOnly:false};
        
                // Set Cookies With Response
                res.cookie('token',data['token'],cookieOption);
                return res.status(200).json(data);
            }else{
                return res.status(200).json(data);
            };
        };
    }catch(e){
        return res.json({status:"fail", message: e.toString()});
    };
};

export const ProfileRead = async (req, res) =>{
    try{
        let user_id = req.headers['user_id'];
        let data = await UsersModel.findOne({"_id":user_id});
        return res.json({status: "Success", message: "User Single ProfileRead Successfully",data:data});
    }catch(e){
        return res.json({status:"fail", message: e.toString()});
    };
};

export const AllProfileRead = async (req, res) =>{
    try{
        let user_id = req.headers['user_id'];
        let data = await UsersModel.find({"_id":user_id});
        return res.json({status:"Success", message: "All User ProfileRead Successfully",data:data});
    }catch(e){
        return res.json({status:"fail", message: e.toString()});
    };
};

export const ProfileUpdate = async (req, res) =>{
    try{
        let reqBody = req.body;
        let user_id = req.headers['user_id'];
        await UsersModel.updateOne({"_id": user_id},reqBody);
        return res.json({status:"Success", message:"Single User ProfileUpdate Successfully"});
    }catch(e){
        return res.json({status:"fail", message: e.toString()});
    };
};

export const Delete = async (req, res) =>{
    try{
        let id = req.params.id;
        let user_id = req.headers['user_id'];
        await UsersModel.deleteOne({"_id": id, "User_id": user_id});
        return res.json({status:"Success", message: "User Delete Single Successfully"});
    }catch(e){
        return res.json({status:"fail", message: e.toString()});
    };
};
