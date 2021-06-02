import {Request} from "express";
import {Model} from "mongoose";
import {QueryOptions} from "mongoose-query-parser";

export interface IRequest extends Request {
    jwtData: any;
    user: {
        _id: string
        role: string
        clinicId:string
    }
    userModel: Model<any>
    clinicModel: Model<any>
    patientModel: Model<any>
    customerModel: Model<any>
    eventModel: Model<any>
    patientTypeModel: Model<any>
    paymentModel: Model<any>
    productModel: Model<any>
    treatmentModel: Model<any>
    mongooseQuery: { limit: number, query: QueryOptions }
}