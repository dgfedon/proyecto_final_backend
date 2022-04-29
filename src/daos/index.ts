import { CartDao, ProductDao } from './firestore.daos';

export let Product: ProductDao;

export let Cart: CartDao;

let path = 'firestore';

if ('something' === 'something') {
    path = 'mongoose';
}
(() => {
    const resp = import(`./${path}.daos`).then(({ CartDao, ProductDao }) => {
        Cart = new CartDao();
        Product = new ProductDao();
    });

    return resp;
})();