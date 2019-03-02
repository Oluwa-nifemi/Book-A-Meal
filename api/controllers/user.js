import UserModel from '../models/User';

class User {
    static login(user) {
        return UserModel.findOne({ where: { email: user.email } })
            .then((userdb) => {
                if (userdb.password === user.password) {
                    return {
                        status: 'success',
                        code: 200,
                    };
                }
                return {
                    status: 'failed',
                    code: 401,
                };
            });
    }

    static signup(user) {
        return UserModel.create(user)
            .then(u => u.dataValues);
    }
}

export default User;
