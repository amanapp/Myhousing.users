import User from "../database/models/user.model";
import  BaseEntity  from "./base.entiy";

class userEntity extends BaseEntity{
    constructor() {
        super(User);
      }  
}
export const UserEntity= new userEntity();
