import chalk from "chalk";
import { ObjectId } from "mongodb";
import { db } from '../db.js';



export async function addTransaction(req, res) {
    const { userId } = res.locals;
    const buyer = req.body;
    let totalValue = 0
    // const encryptCard = bcrypt.hashSync(buyer.cardNumber, 10);
    // const encryptCvv = bcrypt.hashSync(buyer.cvv, 10);
    // const encryptExpiration = bcrypt.hashSync(buyer.expiration, 10);
    
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
        updateProduct(myCart);
        await db.collection('cart').deleteMany({ userId: userId });
        res.status(202).send(acquisition)
    } catch (error) {
        res.sendStatus(500)
    }

}

async function updateProduct(mycart) {
    mycart.map(element => {
        db.collection('products').updateOne({ _id: ObjectId(element.itemId) }, { $set: { albumQuantity: String(parseInt(element.albumQuantity)-element.buyerQuantity) } });
    })


}
