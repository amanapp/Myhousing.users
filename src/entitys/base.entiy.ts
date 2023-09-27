import { AcceptAny } from "../interface/global.interface";

export default class BaseEntity {
  protected model: AcceptAny;
  constructor(sequilizeModel: AcceptAny) {
    this.model = sequilizeModel;
  }
  async findOne(query: any) {
    try {
      const result = await this.model.findOne({ where: query.email });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async Create(query: any) {
    try {
      const result = await this.model.create(query);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async Update(query: object, option: object) {
    try {
      const result = await this.model.update(query, option);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async FindAndCountAll() {

   try {
    const result=await this.model.findAndCountAll(
    );
    return result
   } catch (error) {
    return Promise.reject(error);

   }
  }
}
