import { NextFunction, Request, Response  } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ ok: false, message: "Missing token" });
    }
    const token = auth.slice('Bearer '.length);
    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        (req as any).user = payload;
        next();
    } catch {
        return res.status(401).json({ ok: false, message: "Invalid token" });
    }
}

export function requireRole(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user as JwtPayload | undefined;
        if (!user) return res.status(401).json({ ok: false, message: "Unauthorized" });
        if (!roles.includes(user.role)) {
            return res.status(403).json({ ok: false, message: "Forbidden" });
        }
        next();
    }
}