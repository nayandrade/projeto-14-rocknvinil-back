import { signUpSchema } from "../schemas/signUpSchema.js";
import db from "../db.js";

export async function validateSignUp(request, response, next){
    const body = request.body;
    const isValid = signUpSchema(body);
    const users = db.collection('users');

    if(isValid.error){
        const errorData = isValid.error.details;
        errorData.map(error => {
            if(error.context.key === 'name'){
                return response.status(401).send('Invalid name.');
            }

            if(error.context.key === 'email'){
                return response.status(401).send('Invalid e-mail.');
            }

            if(error.context.key === 'cpf'){
                return response.status(401).send('Invalid CPF. Please, type numbers, only.')
            }

            if(error.context.key === 'password'){
                return response.status(401).send('Invalid password.')
            }
        })
    } else {
        const equalName = await users.findOne({name: body.name});
        const equalEmail = await users.findOne({email: body.email});
        const equalCPF = await users.findOne({cpf: body.cpf});
        if(equalName){
            return response.status(401).send('User name is not available.')
        }

        if(equalEmail){
            return response.status(401).send('User email is not available.')
        }

        if(equalCPF){
            return response.status(401).send('User CPF is not available.')
        }
    }

    next();
}