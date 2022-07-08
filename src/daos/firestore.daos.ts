import { Firestore } from '../contenedores/Firestore';
import { ICart } from '../types/cart';
import { IProduct } from '../types/product';

export class CartDao extends Firestore {
  constructor() {
    super('carts');
  }

  async createCart(): Promise<string | void> {
    try {
      const cart = await this.create({ products: [], timestamp: Date.now()});

      return cart?.id;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cartId: string, productId: string) {
    try {
      const updated = await this.collection.doc(cartId).update({
        products: this.firestore.FieldValue.arrayUnion(productId),
      });

      return updated;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(cartId: string, productId: string) {
    try {
      const deleted = await this.collection.doc(cartId).update({
        products: this.firestore.FieldValue.arrayRemove(productId),
      });

      return deleted;
    } catch (error) {
      console.log(error);
    }
  }
}

export class ProductDao extends Firestore {
  constructor() {
    super('products');
  }
}

