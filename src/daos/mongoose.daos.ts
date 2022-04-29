import { Mongose } from '../base/mongose';
import { Cart } from '../class/Cart';
import { Product } from '../class/Products';
import { interfaceCart } from '../interface/cart';
import { interfaceProduct } from '../interface/product';

export class CartDao extends Mongose<interfaceCart> {
    constructor() {
        super(Cart);
    }

    async createCart(): Promise<string | void> {
        try {
        const cart = await this.create({ products: [], timestamp: Date.now() });

        return cart?.id;
        } catch (err) {
        console.log(err);
        }
    }

    async addProductToCart(cartId: string, productId: string) {
        try {
        return this.model
            .updateOne(
            {
                _id: cartId,
            },
            {
                $push: {
                products: productId,
                },
            }
            )
            .exec();
        } catch (err) {
        console.log(err);
        }
    }

    async deleteProdToCart(cartId: string, productId: string) {
        try {
        return this.model
            .updateOne(
            {
                _id: cartId,
            },
            {
                $pull: {
                products: productId,
                },
            }
            )
            .exec();
        } catch (err) {
        console.log(err);
        }
    }
}

export class ProductDao extends Mongose<interfaceProduct> {
    constructor() {
        super(Product);
    }
}