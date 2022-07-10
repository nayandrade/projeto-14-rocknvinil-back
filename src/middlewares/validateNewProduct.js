import { newProductSchema } from '../schemas/newProductSchema.js'

export async function validateNewProduct(request, response, next){
    const body = request.body;
    const isValid = newProductSchema(body);

    if(isValid.error){
        const errorData = isValid.error.details;
        errorData.map(error => {
            if(error.context.key === 'albumName'){
                return response.status(401).send('Album name must be a non-empty valid string.');
            }
    
            if(error.context.key === 'albumYear'){
                return response.status(401).send('Album year must be a valid year.');
            }
    
            if(error.context.key === 'albumImage'){
                return response.status(401).send('Image link is not valid.');
            }
    
            if(error.context.key === 'albumBand'){
                return response.status(401).send('Album band must be a non-empty valid string.');
            }
    
            if(error.context.key === 'albumPrice'){
                return response.status(401).send('Album price must contain only numbers.');
            }
    
            if(error.context.key === 'albumQuantity'){
                return response.status(401).send('Album quantity must a positive integer.');
            }
    
            if(error.context.key === 'albumDiscount'){
                return response.status(401).send('Album discount must be a number between 0 and 100.');
            }
        })
    } else {
        
        next()
    }
}