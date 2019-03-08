import Joi from 'joi';
import sendError from './senderror';

class Meal {
    static validate(req, res, next) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required(),
            price: Joi.number().required(),
            defaultQuantity: Joi.number().min(1).required(),
        });
        const { error } = Joi.validate(req.body, schema);
        if (error) {
            sendError(error.details[0].message, res);
            return false;
        }
        next();
        return true;
    }
}

export default Meal;
