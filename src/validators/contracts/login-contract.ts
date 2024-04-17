import Joi from "joi";
import IRequestContract from "./interfaces/irequest-contract";

class LoginContract implements IRequestContract {

    private static schema = Joi.object({
        username: Joi.string().required().messages({
            'any.required': 'Username is required.'
        }),
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

    getSchema() {
        return LoginContract.schema
    }
}

export default LoginContract;
