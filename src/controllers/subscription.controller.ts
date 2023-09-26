import { Request, Response } from "express";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";
import { SubscriptionsServices } from "../services/subscriptions.services";


class subscriptionsController{
   async addSubcription(req:Request,res:Response){
    try {
        const { amount, name, offers } = req.body;
        const result = await SubscriptionsServices.addSubcription(amount, name, offers);
    
        res
          .status(HttpStatusCode.CREATED)
          .json({ message: ExceptionMessage.SUBSCRIPTION_ADD });
      } catch (e:any) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
      }   }
}
export const SubscriptionsController =new subscriptionsController();