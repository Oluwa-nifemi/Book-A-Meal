import Joi from 'joi';

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

export default Meal;
