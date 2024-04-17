import Joi from "joi";

interface IRequestContract {
    getSchema(): Joi.ObjectSchema;
}

export default IRequestContract;