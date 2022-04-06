import { promises as fs } from 'fs';
import { interfaceProduct } from '../interface/product';

class Products {
    static fileName = 'products.json';

	static async fileData(): Promise<interfaceProduct[]> {
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

    static async gerateProduct(product: Partial<interfaceProduct>): Promise<interfaceProduct | undefined> {
        try {
            const getData = await this.fileData();

            // @ts-ignore
            const id = getData.length > 0 ? getData?.at(-1)?.id + 1 : 1;

            const prod = {
                id,
                timestamp: Date.now(),
                ...product,
            } as interfaceProduct;

            getData.push(prod);

            await fs.writeFile(this.fileName, JSON.stringify(getData, null, 2));

            return prod;
        } catch (error) {
            
        }
    }

    static async updateProduct(id: number, product: Partial<interfaceProduct>): Promise<interfaceProduct[] | undefined> {
        try {
            let getData = await this.fileData();

            const update = getData.map(item => {
            if (item.id === id) {
                console.log(item);

                return {
                ...item,
                ...product,
                timestamp: Date.now(),
                };
            }

            return item;
        });
            await fs.writeFile(this.fileName, JSON.stringify(update, null, 2));

            return update;
        } catch (error) {
            console.log(`Error al actualizar producto ${error}`);
        }
    }

    static async getById(id: number): Promise<interfaceProduct | undefined> {
        try {
            const getData = await this.fileData();
            // Encontrar mediante id
            const prod = getData.find(item => item.id === id);
            if (prod) {
                return prod;
            } else {
                // Null si no se encuentra
                console.log(`No se pudo encontrar id: ${id}`, null);
            }
        } catch (error) {
            console.log(`Error al obtener id: ${error}`);
        }
    }

    static async getAll(): Promise<interfaceProduct[] | undefined> {
        try {
            // Obtener lectura del archivo
            const getData = await this.fileData();

            return getData;

        } catch (error) {
            console.log(`Error al obtener lectura ${error}`);
        }
    }

    static async deleteById(id: number): Promise<void> {
        try {
            const getData = await this.fileData();
            // Filtrar mediante id
            const product = getData.filter(item => item.id !== id);
            if (product) {
                // Reescribir restantes
                await fs.writeFile(this.fileName, JSON.stringify(product, null, 2));
            }
        } catch (error) {
            console.log(`Error al eliminar por id ${error}`);
        }
    }
}

export default Products;