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
        this.router.post('/signup',SignUpJoiMiddleware.middleware,AuthMiddleware.basic_auth,AuthController.signupUser)
        return this.router;
    }
}
export const AuthRouter = new authRouter();