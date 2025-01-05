"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = authentication;
const token = process.env.TOKEN || "";
function authentication(req, res, next) {
    console.log(req.headers.token, "token*********");
    console.log(token, "token*********");
    try {
        if (req.headers.token !== token) {
            res.status(401).json({
                message: "User is Unauthenticated"
            });
            return;
        }
        next();
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
