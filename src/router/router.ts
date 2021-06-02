import express,{Router} from "express";
import cookieParser from 'cookie-parser';

export const initApiRouter = ():Router => {
    const router = Router()
    router.use(express.json());
    router.use(express.urlencoded({extended: false}));
    router.use(cookieParser());
    router.get('/api', (req, res) => {
        res.send('ok')
    })
    return router

}
