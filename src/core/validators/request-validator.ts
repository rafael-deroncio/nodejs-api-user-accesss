import { Schema, ValidationResult } from "joi";
import IRequestValidator from "./contracts/interfaces/irequest-validator";

class RequestValidator<T extends Schema & IRequestValidator> {
    private _contract: T;
    private _data: object;
    private _errors: string[];

    constructor(contract: T, data: object) {
        this._contract = contract;
        this._data = data;
        this._errors = [];
    }

    validate(): boolean {
        const result: ValidationResult = this._contract.validate(this._data);
        
        if (result.error)
            this._errors = result.error.details.map((detail) => detail.message);
        
        return !!this._errors;
    }

    errors(): string[] {
        return this._errors;
    }
}

export default RequestValidator;
