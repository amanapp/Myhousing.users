import { Request, Response } from "express";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";
import { SubscriptionsServices } from "../services/subscriptions.services";
import { AcceptAny } from "../interface/global.interface";

class subscriptionsController {
  async addSubcription(req: Request, res: Response) {
    try {
      const { amount, name, offers } = req.body;
      const result = await SubscriptionsServices.addSubcription(
        amount,
        name,
        offers
      );

      res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.SUBSCRIPTION_ADD });
    } catch (e: any) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
    }
  }
  async showSubcription(req: Request, res: Response) {
    try {
      const result =await SubscriptionsServices.showSubscription()
      res
        .status(HttpStatusCode.CREATED)
        .json({ message: ExceptionMessage.SUBCRIPTION,result });
    } catch (e: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }
  async purchaseSubcription(req: Request, res: Response){
    try {
      const {subscriptionId,isData}=req.body;
      await SubscriptionsServices.purchaseSubcription(subscriptionId,isData.userId)
      res
        .status(HttpStatusCode.OK)
        .json({ message: ExceptionMessage.SUBCRIPTION });
    } catch (e:AcceptAny) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });

    }

  }
  async revokeSubcription(req: Request, res: Response){
    try {
      const {subscriptionId,isData}=req.body;
      await SubscriptionsServices.revokeSubcription(subscriptionId,isData.userId)
      res
        .status(HttpStatusCode.OK)
        .json({ message: ExceptionMessage.SUBSCRIPTION_REVOKE });
    } catch (e:AcceptAny) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });

    }

  }
}
export const SubscriptionsController = new subscriptionsController();
