import { NextFunction, Request, Response } from 'express';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) : void => {
    
    const administrador = true;

    if (administrador) {
        next();
    } else {
        res.status(401).send({
            error: -1, 
            descripcion: `Ruta ${req.originalUrl} método ${req.method} no autorizada`, 
        });
    }
}

export default adminMiddleware;