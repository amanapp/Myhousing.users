import User from "../database/models/user.model";
import  BaseEntity  from "./base.entiy";

class authEntity extends BaseEntity{
    constructor() {
        super(User);
      }  
}
export const AuthEntity= new authEntity();
