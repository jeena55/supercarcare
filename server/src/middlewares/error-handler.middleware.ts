import { Request, Response, NextFunction } from 'express';
import { CustomError } from './../models/custom-error.model';

/**
 * @description Custom error handler middleware
 * 
 * @example
 * ``` 
 * next(new CustomError("กรุณากรอกข้อมูลให้ครบถ้วน", 400, "ข้อมูลไม่ครบถ้วน"))
 * ```
 * 
 * @param err Error ทีเกิดจาก Express.js
 * @param req Request object จาก Express
 * @param res Response object จาก Express
 * @param next NextFunction function จาก Express
 */
function handleError(
    err: TypeError | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let customError = err;

    if (!(err instanceof CustomError)) {
        customError = new CustomError(
            'มีปัญหาที่ไม่ทราบที่มาเกิดขึ้น'
        );
    }

    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    res.status((customError as CustomError).status).send(customError);
};

export default handleError;