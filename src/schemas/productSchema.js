import joi from "joi";

export default function productSchema(object){
    const yearRegex = /[0-9]{4}/;
    const imageRegex = /^(https:\/\/)?(http:\/\/)?(www)?/;

    const validationSchema = joi.object({
        supplierID: joi.string().required(),
        supplierName: joi.string().required(),
        albumName: joi.string().required(),
        albumYear: joi.string().pattern(yearRegex).required(),
        albumImage: joi.string().pattern(imageRegex).required(),
        albumBand: joi.string().required(),
        albumPrize: joi.string().required(),
        albumQuantity: joi.string().required(),
        albumDiscount: joi.string().required()
    });

    const validation = validationSchema.validate(object, {abortEarly: false});
    return validation;
}