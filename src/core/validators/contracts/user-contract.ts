import Joi from "joi";
import IRequestContract from "./interfaces/irequest-contract";

class UserContract implements IRequestContract {

    private static schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required().messages({
            'string.min': 'First name must be at least {#limit} characters long.',
            'string.max': 'First name must be at most {#limit} characters long.',
            'any.required': 'First name is required.'
        }),
        lastName: Joi.string().min(2).max(50).required().messages({
            'string.min': 'Last name must be at least {#limit} characters long.',
            'string.max': 'Last name must be at most {#limit} characters long.',
            'any.required': 'Last name is required.'
        }),
        birthDate: Joi.date().iso().required().messages({
            'any.required': 'Birth date is required.',
            'date.iso': 'Invalid birth date format. Please use ISO 8601 format.'
        }),
        sex: Joi.string().valid('Male', 'Female', 'Other').required().messages({
            'any.required': 'Sex is required.',
            'any.only': 'Invalid value for sex. Must be Male, Female, or Other.'
        }),
        picture: Joi.string().uri().messages({
            'string.uri': 'Invalid picture URL format.'
        }),
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
    });

    getSchema() {
        return UserContract.schema
    }
}

export default UserContract;
