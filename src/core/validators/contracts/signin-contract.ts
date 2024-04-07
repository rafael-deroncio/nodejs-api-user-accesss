import Joi from "joi";
import AddressContract from "./address-contract";
import TelephoneContract from "./telephone-contratct";
import UserContract from "./user-contract";

class SigninContract {

    private userSchema = UserContract.schema;
    private addressSchema = AddressContract.schema;
    private telephoneSchema = TelephoneContract.schema;

    private _schema = this.userSchema.keys({
        addresses: Joi.array().items(this.addressSchema).required(),
        telephones: Joi.array().items(this.telephoneSchema).required()
    }).options({ abortEarly: false });
}

export default SigninContract;