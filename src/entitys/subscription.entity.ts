import Subscription from "../database/models/subscription.model";
import BaseEntity from "./base.entiy";

class subscriptionEntity extends BaseEntity{
    constructor() {
        super(Subscription);
      }  
  }
export const SubscriptionEntity= new subscriptionEntity();