import { ValidationResult } from "joi";

interface IRequestValidator {
    validate(data: object): ValidationResult;
}

export default IRequestValidator;
