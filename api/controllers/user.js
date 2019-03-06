import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

dotenv.config();

class User {
    static async login(req, res) {
        const userdb = await UserModel.findOne({ where: { email: req.body.email } })
        if (userdb) {
            if (userdb.password === req.body.password) {
                const token = jwt.sign({ id: userdb.id }, process.env.SECRET_KEY);
                res.header('x-auth-token', token).status(200).send({
                    status: 'success',
                });
                return true;
            }
            res.status(400).send('Invalid email or password');
            return false;
        }
        res.status(400).send('Invalid email or password');
        return false;
    }

    static async signup(req, res) {
        try {
            const user = req.body;
            const prevUser = UserModel.find({ where: { email: user.email } });
            if (prevUser) {
                res.status(409).send({
                    status: 'failure',
                    message: 'There\'s already a user with that email',
                });
                return false;
            }
            await UserModel.create(user);
            return res.status(200).send({
                status: 'success',
            });
        } catch (err) {
            return res.status(409);
        }
    }
}

export default User;
