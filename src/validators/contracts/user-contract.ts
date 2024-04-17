import Joi from "joi";
import IRequestContract from "./interfaces/irequest-contract";
import AddressContract from "./address-contract";
import TelephoneContract from "./telephone-contratct";

class UserContract implements IRequestContract {

    private static addressesSchema: Joi.ObjectSchema = (new AddressContract()).getSchema();
    private static telephonesSchema: Joi.ObjectSchema = (new TelephoneContract()).getSchema();

    private schema = Joi.object({
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
        addresses: Joi.array().items(UserContract.addressesSchema).required(),
        telephones: Joi.array().items(UserContract.telephonesSchema).required()
    }).options({ abortEarly: false });

    getSchema(): Joi.ObjectSchema {
        return this.schema
    }
}

export default UserContract;
