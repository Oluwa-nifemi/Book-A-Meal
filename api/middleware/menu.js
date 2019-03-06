import Joi from 'joi';

const schema = Joi.object().keys({
    id: Joi.number().min(1),
    quantity: Joi.number().min(1),
});

class Menu {
    static validate(req, res, next) {
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

export default Menu;
