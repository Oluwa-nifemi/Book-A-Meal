import Joi from 'joi';
import sendError from './senderror';

class OrderItem {
    static add(req, res, next) {
        const schema = Joi.object().keys({
            mealId: Joi.number().min(1).required(),
            userId: Joi.number().min(1).required(),
            quantity: Joi.number().min(1).required(),
            status: Joi.string(),
        });
        const { error } = Joi.validate(req.body, schema);
        if (error) {
            sendError(error.details[0].message, res);
            return false;
        }
        next();
        return true;
    }

    static edit(req, res, next) {
        const schema = Joi.object().keys({
            id: Joi.number().min(1).required(),
            userId: Joi.number().min(1).required(),
            quantity: Joi.number().min(1).required(),
        });
        const { error } = Joi.validate(req.body, schema);
        if (error) {
            const errorMessage = error.details[0].message;
            res.status(409).send({
                status: 'failure',
                message: errorMessage,
            });
            return false;
        }
        next();
        return true;
    }
}

export default OrderItem;
