import { NextFunction, Request, Response } from "express";

const jsonHeaderForResponses = function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('content-type', 'application/json');
    next();
}

export { jsonHeaderForResponses }