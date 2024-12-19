import express from "express";
const router = express.Router();
import *as UsersController from "../Controllers/UsersController.js";
import AuthVerification from "../Middlewares/AuthVerification.js";

// Users
router.post("/Registration",UsersController.Registration);
router.post("/Login",UsersController.Login);
router.get("/ProfileRead",AuthVerification,UsersController.ProfileRead);
router.get("/AllProfileRead",AuthVerification,UsersController.AllProfileRead);
router.post("/ProfileUpdate",AuthVerification,UsersController.ProfileUpdate);
router.get("/Delete",UsersController.Delete);

export default router;