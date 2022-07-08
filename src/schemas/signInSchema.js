import joi from "joi";

export function signInSchema(object){
    const validationSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const validation = validationSchema.validate(object);

    return validation;
}