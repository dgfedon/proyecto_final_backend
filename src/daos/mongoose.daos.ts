import { MongoDB } from '../contenedores/MongoDB';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { ICart } from '../types/cart';
import { IProduct } from '../types/product';
import { IUser } from '../types/user';

export class CartDao extends MongoDB<ICart> {
  constructor() {
    super(Cart);
  }

  async createCart(): Promise<string | void> {
    try {
      const cart = await this.create({ products: [], timestamp: Date.now() });

      return cart?.id;
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(cartId: string, productId: string) {
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
    } catch (error) {
      console.log(error);
    }
  }
}

export class ProductDao extends MongoDB<IProduct> {
  constructor() {
    super(Product);
  }
}

export class UserDao extends MongoDB<IUser> {
  constructor() {
    super(User);
  }

  async getByEmail(email: string) {
    return this.model.findOne({ email });
  }
}
