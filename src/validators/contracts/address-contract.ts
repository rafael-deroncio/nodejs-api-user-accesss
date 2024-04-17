import Joi from "joi";
import IRequestContract from "./interfaces/irequest-contract";

class AddressContract implements IRequestContract {

    private schema = Joi.object({
        street: Joi.string().min(2).max(100).required().messages({
            'string.min': 'Street must be at least {#limit} characters long.',
            'string.max': 'Street must be at most {#limit} characters long.',
            'any.required': 'Street is required.'
        }),
        number: Joi.string().min(1).max(10).required().messages({
            'string.min': 'Number must be at least {#limit} characters long.',
            'string.max': 'Number must be at most {#limit} characters long.',
            'any.required': 'Number is required.'
        }),
        district: Joi.string().min(2).max(50).required().messages({
            'string.min': 'District must be at least {#limit} characters long.',
            'string.max': 'District must be at most {#limit} characters long.',
            'any.required': 'District is required.'
        }),
        city: Joi.string().min(2).max(50).required().messages({
            'string.min': 'City must be at least {#limit} characters long.',
            'string.max': 'City must be at most {#limit} characters long.',
            'any.required': 'City is required.'
        }),
        state: Joi.string().min(2).max(50).required().messages({
            'string.min': 'State must be at least {#limit} characters long.',
            'string.max': 'State must be at most {#limit} characters long.',
            'any.required': 'State is required.'
        }),
        country: Joi.string().min(2).max(50).required().messages({
            'string.min': 'Country must be at least {#limit} characters long.',
            'string.max': 'Country must be at most {#limit} characters long.',
            'any.required': 'Country is required.'
        }),
        zipcode: Joi.string().required().messages({
            'any.required': 'Zip code is required.'
        }),
        type: Joi.string().valid('Home', 'Work', 'Other').required().messages({
            'any.required': 'Address type is required.',
            'any.only': 'Invalid address type. Must be Home, Work, or Other.'
        }),
        principal: Joi.boolean().required().messages({
            'any.required': 'Principal flag is required.'
        })
    }).options({ abortEarly: false });

    getSchema(): Joi.ObjectSchema {
        return this.schema
    }
}

export default AddressContract;
