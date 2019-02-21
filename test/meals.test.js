import chai from 'chai';
import request from 'chai-http';
import app from '../index';

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';

describe('Get meals', () => {
    it('Should return meals array', () => {
        chai.request(app)
            .get(`${apiVersion}/meals`)
            .then(data => JSON.parse(data.body))
            .then((meals) => {
                expect(meals).to.be.an('array');
                expect(meals[0]).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity');
            });
    });
});

describe('Add meal', () => {
    it('Should return meal', () => {
        chai.request(app)
            .post(`${apiVersion}/meals`)
            .send({
                title: 'Test Meal',
                description: 'Juicy tasty cheesy cheeseburger',
                image: 'image1.jpg',
                price: 23.6,
                defaultQuantity: 100,
            })
            .then(res => res.body)
            .then((meal) => {
                expect(meal).to.be.an('object');
                expect(meal).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity');                
            })
            .catch((err) => {
                console.log(err);
            });
    });
});

describe('Edit meal', () => {
    it('Should return meal', () => {
        chai.request(app)
            .put(`${apiVersion}/meals/4`)
            .send({
                title: 'Sparghetti',
                description: 'Juicy tasty cheesy cheeseburger',
                image: 'image1.jpg',
                price: 23.6,
                defaultQuantity: 100,
            })
            .then(res => res.body)
            .then((meal) => {
                expect(meal).to.be.an('object');
                expect(meal).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity');                
            })
            .catch((err) => {
                console.log(err);
            });
    });
});

describe('Delete meal', () => {
    it('Should return nothing and status code 204', () => {
        chai.request(app)
            .delete(`${apiVersion}/meals/4`)
            .then((res) => {
                expect(res).to.be.empty;
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
