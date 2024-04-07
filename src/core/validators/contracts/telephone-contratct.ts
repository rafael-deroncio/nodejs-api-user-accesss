import Joi from "joi";
import IRequestContract from "./interfaces/irequest-contract";

class TelephoneContract implements IRequestContract {

    private static schema = Joi.object({
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

    getSchema() {
        return TelephoneContract.schema
    }
}

export default TelephoneContract;
