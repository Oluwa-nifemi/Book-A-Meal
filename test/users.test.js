import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import UserModel from '../api/models/User';

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';

const userDetails = {
    email: "testuserrr@gmail.com",
    password: "password",
    name: "Test User"
}

describe('User signup', () => {
    it('Should return status success', done => {
        chai.request(app)
            .post(`${apiVersion}/users/signup`)
            .send(userDetails)
            .then(res => res.body)
            .then((data) => {
                expect(data).to.have.all.keys('status')
                expect(data.status).to.be.equal('success');
                done();
            })
        })
    })
describe('User login', () => {
    it('Should return status success', done => {
        chai.request(app)
            .post(`${apiVersion}/users/login`)
            .send({
                    email: userDetails.email,
                    password: userDetails.password,
            })
            .then((res) => {
                expect(res.body.status).to.equal('success');
                UserModel.destroy({ where: { email: userDetails.email }})
                done();
            })
    })
})

