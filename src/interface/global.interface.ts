export type AcceptAny=any


export interface foundUser{
    id?: string | undefined |any |unknown;
    email:string;
    password:string;
    phone_no:number;
    wishlist_id?:object;
    visit_count?:object;
    subscription_id?:string;
    subscription_start?:string;
    subscription_end?:string;
    verification_key:boolean;
    status:boolean;
}

export interface SessionAttributes {
    id: string;
    userId: string;
    device: string;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  