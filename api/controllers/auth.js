import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class Authenticate {
    static async confirmToken(req, res, next) {
        const token = req.headers.bearer;
        if (!token) {
            res.status(409).send('No request token');
            return false;
        }
        try {
            const verify = await jwt.verify(token, process.env.SECRET_KEY);
            req.params.tokenId = verify.id;
            next();
            return true;
        } catch (err) {
            if (err.message === 'invalid signature') {
                res.status(403).send('Invalid signature');
                return false;
            }
            res.status(500).send('Server error');
            return false;
        }
    }

    static async confirmCaterer(req, res, next) {
        const token = req.headers.bearer;
        try {
            const verify = await jwt.verify(token, process.env.SECRET_KEY);
            if (!verify.caterer) {
                res.status(403).send('You\'re not allowed to access that');
                return false;
            }
            next();
            return true;
        } catch (err) {
            if (err.message === 'invalid signature') {
                res.status(403).send('Invalid signature');
                return false;
            }
            res.status(500).send('Server error');
            return false;
        }
    }
}

export default Authenticate;
