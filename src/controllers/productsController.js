import { db }  from '../db.js';


export async function getSuppliersProducts (req, res) {
    const { user } = req;
    try {
        const supplierProducts = await db.collection('products').find({ supplierID: user._id }).toArray();
        const reversedOrderedProducts = supplierProducts.reverse();
        res.send(reversedOrderedProducts);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};

export async function getProductsForSupplier (req, res) {
    const { user } = req;
    try {
        const products = await db.collection('products').find({supplierID: {$ne : user?._id}}).toArray();
        res.send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
};