import { checkoutSchema } from "../schemas/checkoutSchema.js";

export async function validateCheckout(req, res, next) {
    const body = req.body;
    const { error } = checkoutSchema(body)
    if(error) {       
        return res.status(401).send(error.message);
    } else {
        next();
    }
}