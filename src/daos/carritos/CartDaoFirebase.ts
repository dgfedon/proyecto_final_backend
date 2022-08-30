import { Cart, ProductInCart } from '../../models/Cart';
import { FirebaseContainer } from './../../containers/FirebaseContainer';

export class CartDaoFirebase extends FirebaseContainer {
    private static instance: CartDaoFirebase;
    private cartManager = new FirebaseContainer(this.collectionString);

    constructor() {
        super('carts');
    }

    static getInstance() {
        if (!CartDaoFirebase.instance) {
          CartDaoFirebase.instance = new CartDaoFirebase();
        }
        return CartDaoFirebase.instance;
    }

    async getAll() {
       const docs = await this.cartManager.getAll();
       if (docs) {
            const response: any[] = docs.map((doc) => ({
                id: doc.id as string,
                productos: doc.data().productos as ProductInCart[],
                timestamp: doc.data().timestamp as string,
            }));
            return response;      
       }
       return [];
    }

    async getById(id: string) {
        return await this.cartManager.getById(id);
    }

    async addItem(item: Cart) {
        const newCart: Cart = {
            ...item,
            timestamp: new Date().toISOString(),
        }
        return await this.cartManager.addItem(newCart);
    }

    async addItemsByCartId(id: string, items: ProductInCart[]) {
        const newCart: any = await this.getById(id);
        if (newCart) {
            const newProducts = newCart.productos.concat(items);
            newCart.productos = newProducts;
            return await this.updateItemById(id, newCart);
        } 
        return undefined;
    }

    async updateItemById(id: string, item: Cart) {
        return await this.cartManager.updateItemById(id, item);
    }

    async deleteItemById(id: string) {
        return await this.cartManager.deleteItemById(id);
    }

    async deleteItemInCart(cartId: string, productId: string) {
        const newCart: any = await this.getById(cartId);
        if (newCart) {
            newCart.productos = newCart.productos.filter((p: ProductInCart) => p.productId !== productId)
        }
        await this.updateItemById(cartId, newCart);
    }
}