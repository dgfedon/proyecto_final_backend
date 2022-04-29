import { promises as fs } from 'fs';
import { interfaceCart } from '../interface/cart';
import { interfaceProduct } from '../interface/product';
import mongoose from 'mongoose';



const cartMongo = new mongoose.Schema<interfaceCart>(
	{
		products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	},
	{
		timestamps: true,
	}
);

export const Cart = mongoose.model<interfaceCart>('Cart', cartMongo);

/* class Cart {
	static fileName = 'cart.json';

	static async saveCart(): Promise<interfaceCart[]> {
        let getData: string = '[]';

        try {
			// Buscar archivo
			getData = await fs.readFile(this.fileName, 'utf-8');
            
			return JSON.parse(getData);

        } catch (error: any) {
			if (error.code == 'ENOENT') {
				// Escribir en archivo
                await fs.writeFile(this.fileName, '[]');
                getData = await fs.readFile(this.fileName, 'utf-8');
			} else {
				console.log(`Error al escribir archivo ${error}`);
			}
        }

        return JSON.parse(getData);
    }

	static async createCart(): Promise<number | void> {
		try {
			let getData = await this.saveCart();
	
			
			// @ts-ignore
			const id = getData.length > 0 ? getData?.at(-1)?.id + 1 : 1;
		
			getData.push({
				id,
				timestamp: Date.now(),
				products: [],
			});
		
			await fs.writeFile(this.fileName, JSON.stringify(getData, null, 2));
		
			return id;
		} catch (error) {
			console.log(`Error al crear carrito ${error}`);
		}
	}

	static async deleteProdToCart(cartId: number, prodId: number){
		try {
			const getData = await this.saveCart();
			const cart = getData.map(item => {
				if (item.id === cartId) {
					item.products = item.products.filter(prod => prod.id !== prodId);

					return item;
				}
				return item;
			});
			await fs.writeFile(this.fileName, JSON.stringify(cart, null, 2));
		} catch (error) {
			console.log(`Error al eliminar producto del carrito: ${error}`);
		}
	}

	static async addProdToCart(idCart: number, product: interfaceProduct) {
		try {
			let getData = await this.saveCart();
			const data = getData.map(item => {
				if (item.id === idCart) {
					item.products.push(product);
					return item;
				}
				return item;
			});
			const cart = data.filter(item => item.id === idCart);
			await fs.writeFile(this.fileName, JSON.stringify(data, null, 2));

			return cart;
		} catch (error) {
			console.log(`Error al agregar producto al carrito: ${error}`);
		}
	}

    static async getById(id: number): Promise<interfaceCart | undefined> {
        try {
			const getData = await this.saveCart();
            // Encontrar mediante id
            const prod = getData.filter(item => item.id === id);

			return prod[0];
        } catch (error) {
            console.log(`Error al obtener id: ${error}`);
        }
    }

    static async getAll() {
        try {
            // Obtener lectura del archivo
            const getData = await this.saveCart();

            return getData;

        } catch (error) {
            console.log(`Error al obtener lectura ${error}`);
        }
    }

    static async deleteById(id: number) {
        try {
			// Filtrar mediante id
			const getData = await this.saveCart();
            const dataFilter = getData.filter(item => item.id !== id);

			await fs.writeFile(this.fileName, JSON.stringify(dataFilter, null, 2));
        } catch (error) {
            console.log(`Error al eliminar por id ${error}`);
        }
    }

	// Borrar todo
    static async deleteAll() {
		try {
			await fs.writeFile(this.fileName, '[]');
		} catch (error) {
			console.log(`Error al eliminar ${error}`);
		}
    }
}

export default Cart; */