import Joi from 'joi';

class Order {
    static validate(req, res, next) {
        const schema = Joi.object().keys({
            userId: Joi.number().min(1).required(),
            address: Joi.string(),
            orderItems: Joi.array(),
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

export default Order;
