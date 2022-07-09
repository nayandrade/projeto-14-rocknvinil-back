import chalk from "chalk";
import { ObjectId } from "mongodb";
import { db }  from '../db.js';

export async function getCart(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '');
    const user = await db.collection('users').findOne({ token });
    const userId = '123456';
    let totalValue = 0
    
    try {
        const myCart = await db.collection('cart').find({ userId: userId }).toArray();
        //const myCart = await db.collection('cart').find({userId: new ObjectId(user.userId)}).toArray();
        myCart.map(element => {
            totalValue += parseFloat(element.price) * parseInt(element.buyerQuantity)
        })
        const response = {
            myCart: myCart,
            totalValue: totalValue
        }

        res.status(202).send(response)
    } catch (error) {
        res.sendStatus(500)
    }
}

export async function addToCart(req, res) {
    const { supplierName, supplierId, albumName, albumYear, albumPic, bandName, price, discount, quantity, userId } = req.body;
    let disponibility;
    if (quantity > 0) {
        disponibility = true;
    } else {
        disponibility = false;
    }
    const product = {
        supplierName: supplierName,
        supplierId: supplierId,
        albumName: albumName,
        albumYear: albumYear,
        albumPic: albumPic,
        bandName: bandName,
        price: price,
        discount: discount,
        quantity: quantity,
        disponibility: disponibility,
        userId: userId,
        buyerQuantity: 1,
    }

    try {
        console.log(product)
        await db.collection('cart').insertOne(product);
        res.status(200).send({ message: 'Produto adicionado ao carrinho' });
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function removeFromCart(req, res) {
    const productId = req.params.id;
    try {
        await db.collection('cart').deleteOne({ _id: new ObjectId(productId) });
        res.status(200).send({ message: 'Produto removido do carrinho' });
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function editCart(req, res) {
    const productId = req.params.id;
    const { buyerQuantity } = req.body;
    try {
        db.collection('cart').updateOne({ _id: new ObjectId(productId) }, { $set: { buyerQuantity: buyerQuantity } });
        res.status(200).send({ message: 'Produto editado no carrinho' });
    } catch (error) {
        res.sendStatus(500);
    }
}