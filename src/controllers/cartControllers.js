import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc.js';
import tz from 'dayjs/plugin/timezone.js';
import db from '../db.js';

export async function getCart(req, res) {
    const { customerId } = req.query;
    let totalValue = 0
    try {
        const myCart = await db.collection('cart').find({userId: new ObjectId(customerId.userId)}).toArray();
        myCart.map(element => {
            totalValue += element.prize
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
    const { supplierName, supplierId, albumName, albumYear, albumPic, bandName, prize, discount, quantity } = req.body;
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
        prize: prize,
        discount: discount,
        quantity: quantity,
        disponibility: disponibility
    }

    try {
        await db.collection('cart').insertOne(product);
        res.status(200).send({ message: 'Produto adicionado ao carrinho' });
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function removeFromCart(req, res) {
    const { productId } = req.body;
    try {
        await db.collection('cart').deleteOne({ _id: new ObjectId(productId) });
        res.status(200).send({ message: 'Produto removido do carrinho' });
    } catch (error) {
        res.sendStatus(500);
    }
}