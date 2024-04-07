import Joi from "joi";

class TelephoneContract {

    static schema = Joi.object({
        number: Joi.string().required().messages({
            'any.required': 'Phone number is required.'
        }),
        type: Joi.string().valid('Mobile', 'Home', 'Work', 'Other').required().messages({
            'any.required': 'Phone type is required.',
            'any.only': 'Invalid phone type. Must be Mobile, Home, Work, or Other.'
        }),
        principal: Joi.boolean().required().messages({
            'any.required': 'Principal flag is required.'
        })
    }).options({ abortEarly: false });
}

export default TelephoneContract;
