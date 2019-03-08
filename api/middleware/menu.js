import Joi from 'joi';
import sendError from './senderror';

const schema = Joi.object().keys({
    mealId: Joi.number().min(1),
    quantity: Joi.number().min(1),
});

class Menu {
    static validate(req, res, next) {
        const { error } = Joi.validate(req.body, schema);
        if (error) {
            sendError(error.details[0].message, res);
            return false;
        }
        next();
        return true;
    }
}

export default Menu;
