import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

class signUpJoiMiddleware {
  public middleware(req: Request, res: Response, next: NextFunction) {
    const signUpSchema = Joi.object({
      name: Joi.string().min(3).max(15).required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phone_no: Joi.number(),
      wishlist_id: Joi.string(),
      visit_count: Joi.string(),
      subscription_id: Joi.string(),
      subscription_start: Joi.string(),
      subscription_end: Joi.string(),
      verification_key: Joi.string(),
    });

    const { error } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  }
}

export const  SignUpJoiMiddleware=new signUpJoiMiddleware();
