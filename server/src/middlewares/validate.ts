import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = 
(schema: ZodObject, where: 'body' | 'query' | 'params' = 'body') =>
(req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse((req as any)[where]);
    if (!result.success) {
        return res.status(400).json({
            ok: false,
            message: 'validation error',
            details: result.error.format();
        })
    }
    (req as any)[where] = result.data;
    next();
}