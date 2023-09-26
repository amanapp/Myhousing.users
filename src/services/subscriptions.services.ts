import { Request, Response } from "express";
import { AcceptAny } from "../interface/global.interface";
import { SubscriptionEntity } from "../entitys/subscription.entity";


class subscriptionsServices{
    async addSubcription(amount:number, name:string, offers:string){
     try {
         await SubscriptionEntity.Create({amount, name, offers})

     } catch (e:AcceptAny) {
        throw new Error(e.message);
     }
    }
}
export const SubscriptionsServices =new subscriptionsServices()