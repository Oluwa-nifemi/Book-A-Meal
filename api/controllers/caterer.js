import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import CatererModel from '../models/Caterer';

dotenv.config();

class Caterer {
    static async login(req, res) {
        const catererdb = await CatererModel.findOne({ where: { email: req.body.email } });
        if (catererdb) {
            if (catererdb.password === req.body.password) {
                const token = jwt.sign({ id: catererdb.id, caterer: true }, process.env.SECRET_KEY);
                res.header('x-auth-token', token).status(200).json({
                    status: 'success',
                });
                return true;
            }
            res.status(400).json({
                status: 'failure',
                message: 'Invalid email or password',
            });
            return false;
        }
        res.status(400).json({
            status: 'failure',
            message: 'Invalid email or password',
        });
        return false;
    }

    static async signup(req, res) {
        const caterer = req.body;
        await CatererModel.create(caterer);
        res.status(200).json({
            status: 'success',
        });
    }
}

export default Caterer;
