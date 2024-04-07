import Joi from "joi";
import AddressContract from "./address-contract";
import TelephoneContract from "./telephone-contratct";
import UserContract from "./user-contract";
import IRequestContract from "./interfaces/irequest-contract";

class SigninContract implements IRequestContract {

    private static userSchema = new UserContract().getSchema();
    private static addressSchema = new AddressContract().getSchema();
    private static telephoneSchema = new TelephoneContract().getSchema();

    private schema = SigninContract.userSchema.keys({
        addresses: Joi.array().items(SigninContract.addressSchema).required(),
        telephones: Joi.array().items(SigninContract.telephoneSchema).required()
    }).options({ abortEarly: false });

    getSchema() {
        return this.schema
    }
}

export default SigninContract;