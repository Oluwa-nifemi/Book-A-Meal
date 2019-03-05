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
            const caterer = req.body;
            const createdCaterer = await CatererModel.create(caterer);
            const catererDetails = createdCaterer.dataValues;
            return res.status(200).send(catererDetails);
        } catch (err) {
            return res.status(409);
        }
    }
}

export default Caterer;
