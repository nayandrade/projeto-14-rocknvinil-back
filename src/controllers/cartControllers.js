import chalk from "chalk";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from "mongodb";
import { db }  from '../db.js';

dotenv.config()

export async function getCart(req, res) {
    const userId = res.locals.userId;
    console.log(userId)

    let totalValue = 0
    
    try {
        const myCart = await db.collection('cart').find({userId: userId}).toArray();
        console.log(myCart)
        myCart.map(element => {
            totalValue += parseFloat(element.albumPrice) * parseInt(element.buyerQuantity)
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
    const { _id } = req.body;
    const userId = res.locals.userId;

    try {
        const product = await db.collection('products').findOne({ _id: ObjectId(_id) });
        console.log(product)
        const newProduct = {
            supplierID: product.supplierID,
            supplierName: product.supplierName,
            supplierEmail: product.supplierEmail,
            supplierCPF: product.supplierCPF,
            albumName: product.albumName,
            albumYear: product.albumYear,
            albumImage: product.albumImage,
            albumBand: product.albumBand,
            albumPrice: product.albumPrice,
            albumQuantity: product.albumQuantity,
            albumDiscount: product.albumDiscount,
            registerDate: product.registerDate,
            timeStamp: product.timeStamp,
            userId: userId,
        }
        console.log(newProduct)
        db.collection('cart').insertOne({...newProduct, buyerQuantity: 1});
        res.status(200).send({ message: 'Produto adicionado ao carrinho' });
    } catch (error) {
        console.log(error)
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