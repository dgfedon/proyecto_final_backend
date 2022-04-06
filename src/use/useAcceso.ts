import { RequestHandler } from 'express';

export const accesoAdmin: RequestHandler = (req, resp, next) => {
    if (req.body.admin) {
        return next();
    } else {
        return resp.json({ error: 'No autorizado' });
    }
};