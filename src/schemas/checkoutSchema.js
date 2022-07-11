import joi from 'joi';

export function checkoutSchema(object) {

    const cpfRegex = /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/;
    const cardRegex = /^([0-9]){16}$/;
    const ccvRegex = /^([0-9]){3}$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const phoneRegex = /\(?([0-9]{2})\)?([ ]?)([0-9]{4})\2([0-9]{4})/;
    
    const checkoutSchema = joi.object({
        name: joi.string().required(),
        address: joi.string().required(),
        cpf: joi.string().pattern(cpfRegex).required(),
        cardNumber: joi.string().pattern(cardRegex).required(),
        ccv: joi.string().pattern(ccvRegex).required(),
        expirationDate: joi.string().pattern(dateRegex).required(),
        phone: joi.string().pattern(phoneRegex).required(),

    })
    const validation = checkoutSchema.validate(object, {abortEarly: false});
    return validation;

}
