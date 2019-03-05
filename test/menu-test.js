import dotenv from 'dotenv';
import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import UserModel from '../api/models/User';
import jwt from 'jsonwebtoken';

dotenv.config();

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';

const userDetails = {
    email: "menutest@gmail.com",
    password: "password",
    name: "Test User"
}

before(done => {
    UserModel.create(userDetails).then(() => {
        done();
    });
})

describe('Get menu', () => {
    it('Should return menu', done => {
        UserModel.findOne( { where: { email: userDetails.email } })
        .then(user => {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            chai.request(app)
            .get(`${apiVersion}/menu`)
            .set('bearer', token) 
            .then(menu => menu.body)
            .then((menu) => {
                expect(menu).to.have.all.keys('id','date','meals','createdAt','updatedAt');
                done();
            })
        })          
    });
})
describe('Post to menu', () => {
        it('Should return menu array', done => {
            UserModel.findOne( { where: { email: userDetails.email } })
            .then(user => {
                const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
                chai.request(app)
                    .post(`${apiVersion}/menu`)
                    .set('bearer', token)                     
                    .send({
                        "id" : 5,
                        "quantity" : 7,
                    })
                    .then(res => res.text)
                    .then(res => {
                        expect(res).to.be.equal('The meal was added to the database');
                        done();
                    })
        })
    });
});

describe('Delete meal from menu', () => {
    it('Should return empty reply', done => {
        UserModel.findOne( { where: { email: userDetails.email } })
            .then(user => {
                const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);                
                chai.request(app)
                .delete(`${apiVersion}/menu/5`)
                .set('bearer', token)                     
                .then((res) => {
                    expect(res.text).to.be.equal('');
                    done();
                })
                .catch((err) => {
                    console.log(err.message);
                });
            });
        }); 
});

after(done => {
    UserModel.destroy({ where: { email: userDetails.email }})
    .then(() => {
        done();
    })
})
