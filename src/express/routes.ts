import { Router } from 'express';
import { routerCart } from '../routes/routesCart';
import { routerProd } from '../routes/routesProd';

const router = Router();

router.use('/productos', routerProd);
router.use('/carrito', routerCart);

export default router;