import Joi from "joi";

import UserContract from "./user-contract";
import IRequestContract from "./interfaces/irequest-contract";

class SigninContract implements IRequestContract {

    private static userSchema: Joi.ObjectSchema = (new UserContract()).getSchema();

    private schema = Joi.object({
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required.',
            'string.email': 'Invalid email format.'
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
        user: SigninContract.userSchema.required(),
    }).options({ abortEarly: false });

    getSchema() {
        return this.schema
    }
}

export default SigninContract;
