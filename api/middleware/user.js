import Joi from 'joi';

class User {
    static login(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
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

    static signup(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            name: Joi.string().min(3).required(),
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

export default User;
