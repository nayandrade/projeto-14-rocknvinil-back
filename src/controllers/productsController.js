import { db } from './db.js';


export async function getSuppliersProducts (req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    try {
        const session = await db.collection('sessions').findOne( { token });
        if (!session) {
            return res.sendStatus(401);
        }
        const suppliersProducts = await db.collection('products').find({userId: session.userId}).toArray();
        const reversedOrderedProducts = suppliersProducts.reverse();
        res.send(reversedOrderedProducts);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};