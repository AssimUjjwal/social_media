import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiError";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors.length > 0 ? err.errors : undefined,
            stack: err.stack
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message ? err.message : 'Internal Server Error',
        stack: err.stack,
    });
};

export { errorHandler };