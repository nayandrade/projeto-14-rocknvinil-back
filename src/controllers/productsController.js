import { db } from './db.js';


export async function getSuppliersProducts (req, res) {
    const { supplierId } = req.body;
    try {
        const supplierProducts = await db.collection('products').find({ supplierId }).toArray();
        const reversedOrderedProducts = supplierProducts.reverse();
        res.send(reversedOrderedProducts);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};

export async function getProductsForSupplier (req, res) {
    const { supplierId } = req.body;
    try {
        const allProducts = await db.collection('products').find.toArray();
        const productsForSupplier = allProducts.filter(product => product.supplierId !== allProducts.supplierId);
        res.send(productsForSupplier);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};