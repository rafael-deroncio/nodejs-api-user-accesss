interface IRequestValidator {
    validate(): void;
    errors: string[];
    isValid: boolean;
}

export default IRequestValidator;
