import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import AuthMiddleware from "../middleware/basic.middleware";
import { SignUpJoiMiddleware } from "../middleware/joi.middleware";
import { SubscriptionsController } from "../controllers/subscription.controller";
import { AuthMiddlewares } from "../middleware/bearer.middleware";
import { TokenController } from "../controllers/refesh-token.controller";

class authRouter {
  private router!: Router;
  constructor() {
    this.router = Router();
  }
  loadRoute() {
    this.router.post(
      "/user/signup",
      AuthMiddleware.basic_auth,
      SignUpJoiMiddleware.middleware,
      AuthController.signupUser
    );
    this.router.post("/otp-send", AuthController.otpSend);
    this.router.post("/user/verify", AuthController.userVerify);
    this.router.post("/user/login", AuthController.loginUser);
    /** subcription add in the db  */
    this.router.post(
      "/add/subscription",
      SubscriptionsController.addSubcription
    );
    this.router.get(
      "/subscription/show",
      SubscriptionsController.showSubcription
    );
    this.router.post(
      "/user/subscription",
      AuthMiddlewares.acessToken,
      SubscriptionsController.purchaseSubcription
    );
    this.router.post(
      "/subscription/revoke",
      AuthMiddlewares.acessToken,
      SubscriptionsController.revokeSubcription
    );

    /**refesh token creation  */
    this.router.post(
      "/newtoken",
      AuthMiddlewares.referaceToken,
      TokenController.refeshToken
    );
    return this.router;
  }
}
export const AuthRouter = new authRouter();
