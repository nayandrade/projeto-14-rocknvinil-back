import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import db from '../db.js'
dotenv.config()

export async function productController(request, response){
    const body = request.body;

    const authorization = request.headers.authorization;
    const token = authorization?.replace(/Bearer |'|"/g, '');
    const SECRET_KEY = process.env.JWT_SECRET;
    const userData = jwt.verify(token, SECRET_KEY);

    const date = dayjs().format('DD/MM/YYYY');
    const timeStamp = Date.now();

    const newProduct = {
        supplierID: userData._id,
        supplierName: userData.name,
        supplierEmail: userData.email,
        supplierCPF: userData.cpf,
        ...body,
        registerDate: date,
        timeStamp
    }

    const products = db.collection('products');
    try{
        await products.insertOne(newProduct);
        const newRegister = await products.findOne({timeStamp});
        return response.status(200).send(newRegister);
    }catch(error){
        return response.sendStatus(401);
    }

}