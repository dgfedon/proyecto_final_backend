import { Router } from 'express';
import { productsRoutes } from './products';
import { cartRoutes } from './cart';
import { userroroutes } from './user';

const router = Router();

router.use('/products', productsRoutes);
router.use('/cart', cartRoutes);
router.use('/users', userroroutes);

export { router };
