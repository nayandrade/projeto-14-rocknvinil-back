import { ObjectId } from "mongodb";
import { db } from '../db.js';
import nodemailer from 'nodemailer';

export async function addTransaction(req, res) {
    const { userId } = res.locals;
    const buyer = req.body;
    let totalValue = 0
    
    try {
        const myCart = await db.collection('cart').find({ userId: userId }).toArray();
        myCart.map(element => {
            
            if(element.albumDiscount !== 0) {
                totalValue += parseFloat(element.albumPrice) * parseInt(element.buyerQuantity) * (1 - (element.albumDiscount/100))
            } else {
                totalValue += parseFloat(element.albumPrice) * parseInt(element.buyerQuantity)
            }
            
        })
        const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
  
        const acquisition = {
            user: { name: user.name, email: user.email, cpf: user.cpf },
            buyer: buyer, 
            myCart: myCart,
            totalValue: totalValue
        }
        await db.collection('transactions').insertOne(acquisition);
        updateProduct(myCart, acquisition);
        await db.collection('cart').deleteMany({ userId: userId });
        res.status(202).send(acquisition)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function updateProduct(mycart, acquisition) {
    mycart.map(element => {
        db.collection('products').updateOne({ _id: ObjectId(element.itemId) }, { $set: { albumQuantity: String(parseInt(element.albumQuantity)-element.buyerQuantity) } });
    })
    sendEmail(acquisition);
}

async function sendEmail(acquisition) {
    "use strict";
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass  // generated ethereal password
        }
    });

    const msg = {
        to: "nrdeandrade@gmail.com",
        from: "nrdeandrade@gmail.com",
        subject: 'Sua compra foi realizada com sucesso!',
        html: `
        Olá ${acquisition.buyer.name},</br>
        Sua compra foi realizada com sucesso!</br>
        Dados de sua compra: ${
            acquisition.myCart.map(element => {
                return `
                
                <div>
                    <p>Album: </P>
                    <div>
                        <img src=${element.albumImage} width="50" height="50"/>
                        <div>
                            <p>Album: ${element.albumName}</p>
                            <p>Artista: ${element.albumBand}</p>
                            <p>Preço: R$ ${element.albumPrice}</p>
                            <p>Quantidade: ${element.buyerQuantity}</p>
                        </div>
                    </div>
                </div>
                `
            })
        }
        Valor total: R$ ${acquisition.totalValue}
        `,
    };
    console.log(msg)
    try {
        const info = await transporter.sendMail(msg);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error)
    }
}


