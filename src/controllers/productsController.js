import { db } from './db.js';


export async function getSuppliersProducts (req, res) {
    const supplierId = req.body;
    try {
        const supplierProducts = await db.collection('products').find({ supplierId }).toArray();
        const reversedOrderedProducts = supplierProducts.reverse();
        res.send(reversedOrderedProducts);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};