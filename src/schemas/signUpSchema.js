import joi from "joi";

export default function signUpSchema(object){
    const cpfRegex = /[0-9]{11}/;

    const validationSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        cpf: joi.string().pattern(cpfRegex).required(),
        password: joi.string().required(),
    })

    const validation = validationSchema.validate(object, {abortEarly: false});
    return validation;
}