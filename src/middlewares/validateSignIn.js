import { signInSchema } from '../schemas/signInSchema.js';
import { db } from '../db.js';
import bcrypt from 'bcrypt';

export async function validateSignIn(request, response, next){
    const body = request.body;
    const isValid = signInSchema(body);
    const users = db.collection('users');

    try{
        const user = await users.findOne({email: body.email});
        const isValidPassword = bcrypt.compareSync(body.password, user.password);
        
        if(isValid.error || !user || !isValidPassword){
            return response.status(401).send('Invalid email or password.')  
        }

        delete user.password;

        response.locals.user = user;

        next();
        
    }catch(error){
        return response.status(401).send('Invalid email or password.')
    }
}