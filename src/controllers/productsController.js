import { db } from './db.js';


export async function getSuppliersProducts (req, res) {
    const supplierId = process.env.JWT_SECRET; //puxar do req
    try {
        const supplierProducts = await db.collection('products').find({ supplierId }).toArray();
        const reversedOrderedProducts = supplierProducts.reverse();
        res.send(reversedOrderedProducts);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};