import { db } from "../db.js";
import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export async function signUpController(request, response){
    const body = request.body;
    const encryptKey = bcrypt.hashSync(body.password, 10);
    const users = db.collection('users');
    const newUser = {
        name: body.name,
        email: body.email,
        cpf: body.cpf,
        password: encryptKey
    }

    try{
        await users.insertOne(newUser);
        return response.status(200).send(`Everything OK! Welcome ${body.name}!`)
    }catch(error){
        return response.status(500).send('Something went wrong. Try again later.')
    }
}

export async function signInController(request, response){
    const user = response.locals.user;
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jwt.sign(user, SECRET_KEY);
    const data = jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        request.user = decoded 
    });
    return response.status(200).send({user: request.user, token: token});
}