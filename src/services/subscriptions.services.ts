import { Request, Response } from "express";
import { AcceptAny } from "../interface/global.interface";
import { SubscriptionEntity } from "../entitys/subscription.entity";
import { UserEntity } from "../entitys/auth.entity";

class subscriptionsServices {
  async addSubcription(amount: number, name: string, offers: string) {
    try {
      console.log(amount);
      await SubscriptionEntity.Create({ amount, name, offers });
    } catch (e: AcceptAny) {
      throw new Error(e.message);
    }
  }

  async showSubscription() {
    try {
      return await SubscriptionEntity.FindAndCountAll();
    } catch (e: AcceptAny) {
      throw new Error(e.message);
    }
  }

  async purchaseSubcription(subscriptionId: string, userId: string) {
    try {
      let foundUser = await UserEntity.findOne(userId);
      const SubscriptionStartDate = new Date();
      const SubscriptionEndDate = new Date(
        new Date().setDate(SubscriptionStartDate.getDate() + 30)
      );

      const startUnixTime = SubscriptionStartDate.getTime();
      const endUnixTime = SubscriptionEndDate.getTime();
      await UserEntity.Update(
        {
          subscription_id: subscriptionId,
          subscription_start: startUnixTime,
          subscription_end: endUnixTime,
        },
        { where: { email: foundUser.email } }
      );
    } catch (e: AcceptAny) {
      throw new Error(e.message);
    }
  }

  async revokeSubcription(subscriptionId: string, userId: string) {
    try {
      let foundUser = await UserEntity.findOne(userId);

      const SubscriptionStartDate = new Date();
      const SubscriptionEndDate = new Date(
        new Date().setDate(SubscriptionStartDate.getDate() + 30)
      );
      const startUnixTime = SubscriptionStartDate.getTime();
      const endUnixTime = SubscriptionEndDate.getTime();

      if (startUnixTime < foundUser.subscription_end) {
        throw new Error("your subscription not expire !! ");
      }
      await UserEntity.Update(
        {
          subscription_id: subscriptionId,
          subscription_start: startUnixTime,
          subscription_end: endUnixTime,
        },
        { where: { email: foundUser.email } }
      );
    } catch (e: AcceptAny) {
      throw new Error(e.message);
    }
  }
}
export const SubscriptionsServices = new subscriptionsServices();
