import {NextFunction, Response} from "express";
import {MongooseQueryParser} from "mongoose-query-parser";
import {IRequest} from "@router";

export const dbMiddleware = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const parser = new MongooseQueryParser();
        req.mongooseQuery = {limit: 10000, query: parser.parse(req.query)};
        next()
    } catch (e) {
        res.status(500)
    }


}