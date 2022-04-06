import { addCart, deleteCartAll, getCartAll, addToCart, deleteToCart } from '../use/useCart';
import { Router } from 'express';

const routerCart = Router();


routerCart.post('/', addCart);
routerCart.delete('/:id', deleteCartAll);
routerCart.get('/:id/productos', getCartAll);
routerCart.post('/:id/productos', addToCart);
routerCart.delete('/:id/productos/:prodId', deleteToCart)

export { routerCart };