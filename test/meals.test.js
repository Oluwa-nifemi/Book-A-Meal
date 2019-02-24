import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import fs from 'fs';
import path from 'path'; 

const { expect, use } = chai;

use(request);

const p = path.join(__dirname, '../api/data', 'meals.json');

const apiVersion = '/api/v1';

describe('Get meals', () => {
    it('Should return meals array', () => {
        chai.request(app)
            .get(`${apiVersion}/meals`)
            .then(data => JSON.parse(data.body))
            .then((meals) => {
                expect(meals).to.be.an('array');
                expect(meals[0]).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity');
            })
            .catch((err) => {
                console.log(err);                
            })
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
                const meals = JSON.parse(fs.readFileSync(p, 'utf-8'));
                meals.pop();
                fs.writeFileSync(p,JSON.stringify(meals));
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
});

describe('Edit meal', () => {
    it('Should return meal', () => {
        chai.request(app)
            .put(`${apiVersion}/meals/15`)
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
                console.log(err.message);
            });
    });
});

describe('Delete meal', () => {
    it('Should return nothing and status code 204', () => {
        chai.request(app)
            .delete(`${apiVersion}/meals/4`)
            .then((res) => {
                expect(res.text).to.be.equal('');
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
});
