import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import AuthMiddleware from "../middleware/basic.middleware";
import { SignUpJoiMiddleware } from "../middleware/joi.middleware";

class authRouter{
    private router!: Router;
    constructor(){
        this.router = Router();
    }
    loadRoute(){
        this.router.post('/user/signup',AuthMiddleware.basic_auth,SignUpJoiMiddleware.middleware,AuthController.signupUser)
        this.router.post('/owner/signup',AuthMiddleware.basic_auth,SignUpJoiMiddleware.middleware,AuthController.signupOwner)
        this.router.post('/user/verify',AuthController.userVerify)
        this.router.post('/owner/verify',AuthController.ownerVerify)

        return this.router;
    }
}
export const AuthRouter = new authRouter();