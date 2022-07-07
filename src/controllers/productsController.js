import { db } from './db.js';
import jwt from 'jsonwebtoken';


export async function getSuppliersProducts (req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    const { supplierName } = process.env.JWT_SECRET;
    try {
        const supplier = await db.collection('products').findOne( { supplierName });
        const supplierProducts = await db.collection('products').find({supplierName: supplier.supplierName}).toArray();
        const reversedOrderedProducts = supplierProducts.reverse();
        res.send(reversedOrderedProducts);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};