import Joi from "joi";

const productsSchema = Joi.object({
    supplierName: Joi.string()
        .required(),
    albumName: Joi.string()
        .required(),
    albumYear: Joi.number()
        .required(),
    albumPic: Joi.string()
        .required()
        .regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/),
    bandName: Joi.string()
        .required(),
    prize: Joi.string()
        .required()
        .regex(/(?:\+|\-|\$)?\d{1,}(?:\,?\d{3})*(?:\.\d+)?%?/),
    discount: Joi.number()
        .required(),
    amountAvailable: Joi.number()
        .required()
});

export { productsSchema }