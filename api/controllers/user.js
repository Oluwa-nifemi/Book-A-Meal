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
            }
            return res.status(400).send('Invalid email or password');
        }
        return res.status(400).send('Invalid email or password');
    }

    static async signup(req, res) {
        try {
            const user = req.body;
            const createdUser = await UserModel.create(user);
            const userDetails = createdUser.dataValues;
            return res.status(200).send(userDetails);
        } catch (err) {
            return res.status(409);
        }
    }
}

export default User;
