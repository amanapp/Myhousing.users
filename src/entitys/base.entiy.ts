import { AcceptAny } from "../interface/global.interface";

export default class BaseEntity{
  protected model: AcceptAny;
  constructor(mongoModel:AcceptAny) {
    this.model = mongoModel;
  }
  async findOne(query:any) {
    try {
      const result = await this.model.findOne({where:query.email});
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async Create(query:any) {
    try {
      
      const result = await this.model.create(query);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

