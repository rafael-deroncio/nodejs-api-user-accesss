import { ValidationResult } from "joi";
import IRequestValidator from "./contracts/interfaces/irequest-validator";
import IRequestContract from "./contracts/interfaces/irequest-contract";

class RequestValidator<T extends IRequestContract> implements IRequestValidator {
    private _contract: T;
    private _data: object;
    private _errors: string[];

    constructor(contract: new () => T, data: object, validate: boolean = true) {
        this._contract = new contract();
        this._data = data;
        this._errors = [];

        if (validate) this.validate();
    }

    validate() {
        const result: ValidationResult = this._contract.getSchema().validate(this._data);
        if (result.error)
            this._errors = result.error.details.map((detail) => detail.message);
    }

    get errors(): string[] {
        return this._errors;
    }

    get isValid(): boolean {
        return this._errors.length == 0;
    }
}

export default RequestValidator;
