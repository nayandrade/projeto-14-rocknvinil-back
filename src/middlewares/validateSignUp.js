import { signUpSchema } from "../schemas/signUpSchema.js";

export async function validateSignUp(request, response, next){
    const body = request.body;
    const isValid = signUpSchema(body);

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
    }

    next();
}