import {NextFunction, Response} from "express";
import {IRequest} from "@router";

export interface IControllerMethod {
    type?: 'getOne' | 'getAll' | 'postOne' | 'putOne' | 'patchOne' | 'deleteOne';
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string;
    middlewares?: Array<(req: IRequest, res: Response, next: NextFunction) => Response>;
    action: (req: IRequest, res: Response) => void;

}

export class ApiController {
    constructor(public model: string, public methods: IControllerMethod[]) {
    }
}