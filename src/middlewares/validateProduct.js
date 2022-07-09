import { productSchema } from '../schemas/productSchema.js'

export async function validateProduct(request, response, next){
    const body = request.body;
    const isValid = productSchema(body);
}