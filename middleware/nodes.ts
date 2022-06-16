import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from '../config.json';

const signNode = function (req: Request, res: Response, next: NextFunction) {
    next();
}

const verifyNode = function (req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.header("TOKEN");
        if (token === undefined) {
            token = '';
        }
        const verifiyed = jwt.verify(token, config.jwtSecretKey);
        if (verifiyed) {
            next();
        } else {
            res.status(403).send(new Error("Access Denied"));
        }
    } catch (err) {
        res.status(403).send(err);
    }
}

export { signNode, verifyNode }