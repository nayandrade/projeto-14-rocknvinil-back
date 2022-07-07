import db from "../db.js";
import bcrypt from 'bcrypt';

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