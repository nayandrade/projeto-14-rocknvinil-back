import joi from "joi";

export function productSchema(object){
    const yearRegex = /[1-9]{4}/;
    const imageRegex = /^(https:\/\/)?(http:\/\/)?(www)?/;

    const validationSchema = joi.object({
        albumName: joi.string().required(),
        albumYear: joi.string().pattern(yearRegex).required(),
        albumImage: joi.string().pattern(imageRegex).required(),
        albumBand: joi.string().required(),
        albumPrice: joi.string().required(),
        albumQuantity: joi.string().required(),
        albumDiscount: joi.string().required()
    });

    const validation = validationSchema.validate(object, {abortEarly: false});
    return validation;
}