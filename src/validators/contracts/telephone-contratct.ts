import Joi from "joi";
import IRequestContract from "./interfaces/irequest-contract";

class TelephoneContract implements IRequestContract {

    private static schema = Joi.object({
        number: Joi.string()
            .pattern(new RegExp(/^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/))
            .min(10).max(20).required().messages({
                'string.pattern.base': 'The phoneNumber field must follow one of the following valid formats: (XX) XXXX-XXXX, (XX) XXXXX-XXXX, XX XXXX-XXXX, XX XXXXX-XXXX, XX.XXXX-XXXX, XX.XXXX-XXXX, XX-XXXX-XXXX, XX-XXXXX-XXXX, XXXXXXXXXX, XXXXXXXXXXX',
                'string.min': 'The phone number field must have at least {#limit} characters',
                'string.max': 'The phone number field must have at most {#limit} characters',
                'any.required': 'The phone number field is required',
            }),
        type: Joi.string().valid('Mobile', 'Home', 'Work', 'Other').required().messages({
            'any.required': 'Phone type is required.',
            'any.only': 'Invalid phone type. Must be Mobile, Home, Work, or Other.'
        }),
        principal: Joi.boolean().required().messages({
            'any.required': 'Principal flag is required.'
        })
    }).options({ abortEarly: false });

    getSchema(): Joi.ObjectSchema {
        return TelephoneContract.schema
    }
}

export default TelephoneContract;
