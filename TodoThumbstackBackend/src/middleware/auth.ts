import { Request, Response,NextFunction } from "express";
require('dotenv').config();

const token = process.env.TOKEN;
export function authentication(req: Request, res: Response, next: NextFunction):void {
    console.log(req.headers.token, "token*********");
    console.log(token, "token*********");
    
    try {
        if(req.headers.token !== token){
            res.status(401).json({
                message: "User is Unauthenticated"
            });
            return;
        }
        next();
    } catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
