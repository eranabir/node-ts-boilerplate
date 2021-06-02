import express, {Request, Response, Router} from 'express';
import {dbMiddleware} from "@middlewares";
import {ApiController, EntityController} from "@controllers";

export class ApiRouter {

    router = express.Router();

    constructor(private controller: EntityController | ApiController) {}

    init(): Router {
        this.controller.methods.forEach((controllerMethod) => {
            const {method, path, action, middlewares = []} = controllerMethod;
            this.router[method.toLowerCase()](path, [dbMiddleware, ...middlewares], this.request(action));
        })
        return this.router
    }

    request(action) {
        return async (req: Request, res: Response): Promise<Response> => {
            try {
              await action(req, res)
            } catch (e) {
                console.log(e);
                return res.sendStatus(500)
            }
        }
    }
}
