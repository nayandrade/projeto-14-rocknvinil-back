import { response } from "express";
import { checkoutSchema } from "../schemas/checkoutSchema.js";

export async function validateCheckout(req, res, next) {
    const body = req.body;
    const { error } = checkoutSchema(body)
    if(error) {
        const errorData = error.details;

        errorData.map(e => {
            if(e.context.key === 'name'){
                return res.status(401).send('Invalid user name.')
            }

            if(e.context.key === 'address'){
                return res.status(401).send('Invalid address.')
            }

            if(e.context.key === 'cpf'){
                return res.status(401).send('Invalid CPF.')
            }

            if(e.context.key === 'cardNumber'){
                return res.status(401).send('Invalid card number.')
            }

            if(e.context.key === 'ccv'){
                return res.status(401).send('Invalid CCV.')
            }

            if(e.context.key === 'expirationDate'){
                return res.status(401).send('Invalid expiration date.')
            }

            if(e.context.key === 'phone'){
                return res.status(401).send('Invalid phone number.')
            }
        })

    } else {
        next();
    }
}