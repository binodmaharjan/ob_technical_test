import { NextFunction, Response, Request} from "express";
import { validationResult } from "express-validator";


/**
 * Middleware to validate form data
 * if any error is found, it will return a 400 status code with the error message
 */

export const formValidate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }
    next();
}