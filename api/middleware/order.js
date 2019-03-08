import Joi from 'joi';
import sendError from './senderror';

class Order {
    static validate(req, res, next) {
        const schema = Joi.object().keys({
            userId: Joi.number().min(1).required(),
            address: Joi.string(),
            orderItems: Joi.array(),
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

export default Order;
