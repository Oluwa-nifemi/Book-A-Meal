import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import UserModel from '../api/models/User';

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';


describe('User signup', () => {
    it('Should return status success', () => {
        chai.request(app)
            .post(`${apiVersion}/users/signup`)
            .send({
                    email: "test@gmail.com",
                    password: "password",
                    name: "Test User"
            })
            .then(res => res.body)
            .then((data) => {
                expect(data).to.have.all.keys('status')
                expect(data.status).to.be.equal('success');
                done();
            })
        })
    })
describe('User login', () => {
    it('Should return status success', () => {
        chai.request(app)
            .post(`${apiVersion}/users/signup`)
            .send({
                    email: "test@gmail.com",
                    password: "password",
            })
            .then((res) => {
                expect(res.body).to.have.all.keys('status')
                expect(res.body.status).to.be.equal('success');
                UserModel.destroy({ where: { email: 'test@gmail.com' }})
            })
    })
})

