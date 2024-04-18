import Joi from "joi";
import IRequestContract from "./interfaces/irequest-contract";

class LoginContract implements IRequestContract {

    private schema = Joi.object({
        username: Joi.alternatives().try(
            Joi.string().email().messages({
                'string.email': 'Username must be a valid email address.'
            }),
            Joi.string().required().messages({
                'any.required': 'Username is required.'
            })
        ),
        password: Joi.string()
            .min(8)
            .max(100)
            .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/))
            .required()
            .messages({
                'string.min': 'Password must be at least {#limit} characters long.',
                'string.max': 'Password must be at most {#limit} characters long.',
                'any.required': 'Password is required.',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
            }),
    });

    getSchema(): Joi.ObjectSchema {
        return this.schema
    }
}

export default LoginContract;
