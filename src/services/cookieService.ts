import {generateToken} from "@services/jwtService";
import {Response} from "express";
export const appendAuthCookieToResponse = (user, res:Response) => {
    const token = generateToken(user);
    const cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    res.cookie('', token, cookieOptions);
}
export const clearAuthCookieFromResponse = (res:Response) => {
    res.clearCookie("");
}

