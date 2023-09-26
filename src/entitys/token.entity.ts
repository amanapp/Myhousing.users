import Session from "../database/models/session.model";
import Token from "../database/models/token.model";
import  BaseEntity  from "./base.entiy";


class tokenEntity extends BaseEntity{
    constructor() {
        super(Token);
      }  
  }
export const TokenEntity= new tokenEntity();

class sessionEntity extends BaseEntity{
    constructor() {
        super(Session);
      }  
  }
  export const SessionEntity= new sessionEntity();
    