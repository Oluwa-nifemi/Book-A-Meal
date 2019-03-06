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
    email: "testasd@gmail.com",
    password: "password",
    name: "Test User"
}

let id, catererId;

before(done => {
    CatererModel.create(catererDetails).then((caterer) => {
        catererId = caterer.id;
        done();
    });
})

describe('Get meals', () => {
        it('Should return meals array', done => {
                const token = jwt.sign({ id: catererId, caterer: true }, process.env.SECRET_KEY);
                chai.request(app)
                    .get(`${apiVersion}/meals`)
                    .set('bearer', token) 
                    .then(res => res.body)
                    .then((body) => {
                        expect(body).to.have.all.keys('status','data');
                        expect(body.status).to.equal('success');
                        expect(body.data).to.be.an('array');
                        done();
                    })
                    .catch((err) => {
                        console.log(err);                
                    })
    });
});


describe('Add meal', () => {
    it('Should return meal', done => {
            const token = jwt.sign({ id: catererId, caterer: true }, process.env.SECRET_KEY);
            chai.request(app)
                .post(`${apiVersion}/meals`)
                .set('bearer', token) 
                .send({
                    title: 'Test Meal',
                    description: 'Juicy tasty cheesy cheeseburger',
                    image: 'image1.jpg',
                    price: 23.6,
                    defaultQuantity: 100,
                })
                .then(res => res.body)
                .then((body) => {
                    expect(body).to.have.all.keys('status','data');
                    expect(body.status).to.equal('success');
                    expect(body.data).to.be.an('object');
                    id = body.data.id;
                    done();
                })
    });
});

describe('Edit meal', () => {
    it('Should return meal', done => {
            const token = jwt.sign({ id: catererId, caterer: true }, process.env.SECRET_KEY);
                chai.request(app)
                .put(`${apiVersion}/meals/${id}`)
                .set('bearer', token) 
                .send({
                    title: 'Sparghetti',
                    description: 'Juicy tasty cheesy cheeseburger',
                    image: 'image1.jpg',
                    price: 23.6,
                    defaultQuantity: 100,
                })
                .then(res => res.body)
                .then((body) => {
                    expect(body).to.have.all.keys('status','data');
                    expect(body.status).to.equal('success');
                    expect(body.data).to.be.an('object');
                    done();
                });
            })
    });

describe('Delete meal', () => {
    it('Should return nothing and status code 204', done => {
            const token = jwt.sign({ id: catererId, caterer: true }, process.env.SECRET_KEY);
            chai.request(app)
                .delete(`${apiVersion}/meals/${id}`)
                .set('bearer', token) 
                .then((res) => {
                    expect(res.text).to.be.equal('');
                    done();
                })
                .catch((err) => {
                    console.log(err.message);
                });
            })
    })
    
after(done => {
    CatererModel.destroy({ where: { email: catererDetails.email }})
    .then(() => {
        done();
    })
})