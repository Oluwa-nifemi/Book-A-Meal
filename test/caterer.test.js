import dotenv from 'dotenv';
import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import CatererModel from '../api/models/Caterer';
import jwt from 'jsonwebtoken';

dotenv.config();

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';

const catererDetails = {
    email: "test@gmail.com",
    password: "password",
    name: "Test User"
}

before(done => {
    app.on('connected', () => {
        done();
    })
})

describe('Caterer signup', () => {
    it('Should return status success', () => {
        chai.request(app)
            .post(`${apiVersion}/caterers/signup`)
            .send({
                    email: "test@gmail.com",
                    password: "password",
                    name: "Test User"
            })
            .then(res => res.body)
            .then((data) => {
                expect(data).to.have.all.keys('status')
                expect(data.status).to.be.equal('success');
            })
        })
})
describe('Caterer login', () => {
    it('Should return status success', () => {
        chai.request(app)
            .post(`${apiVersion}/caterers/login`)
            .send({
                    email: "test@gmail.com",
                    password: "password",
            })
            .then((res) => {
                expect(res.body.status).to.be.equal('success');
                CatererModel.destroy({ where: { email: 'test@gmail.com' }})
            })
    })
})

