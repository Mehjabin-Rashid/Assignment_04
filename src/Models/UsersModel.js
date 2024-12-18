import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIDNumber: {type:String},
    phoneNumber:{type:String, required: true},
    password: {type: String, required: true},
    bloodGroup: {type:String},
    },
    {timestamps: true, versionKey: false},
);

const UsersModel = mongoose.model("Users", UserSchema);
export default UsersModel;
