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

let id;

before(done => {
    CatererModel.create(catererDetails).then(() => {
        done();
    });
})

describe('Get meals', () => {
        it('Should return meals array', done => {
            CatererModel.findOne( { where: { email: catererDetails.email } })
            .then(caterer => {
                const token = jwt.sign({ id: caterer.id, caterer: true }, process.env.SECRET_KEY);
                chai.request(app)
                    .get(`${apiVersion}/meals`)
                    .set('bearer', token) 
                    .then(data => data.body)
                    .then((meals) => {
                        expect(meals).to.be.an('array');
                        expect(meals[0]).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity','createdAt', 'updatedAt');
                        done();
                    })
                    .catch((err) => {
                        console.log(err);                
                    })
        })
    });
});


describe('Add meal', () => {
    it('Should return meal', done => {
        CatererModel.findOne( { where: { email: catererDetails.email } })        
        .then(caterer => {
            const token = jwt.sign({ id: caterer.id, caterer: true }, process.env.SECRET_KEY);
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
                .then((meal) => {
                    expect(meal).to.be.an('object');
                    expect(meal).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity','createdAt', 'updatedAt');
                    done();
                    id = meal.id;
                })
        });
    });
});

describe('Edit meal', () => {
    it('Should return meal', done => {
        CatererModel.findOne( { where: { email: catererDetails.email } })        
        .then(caterer => {
            const token = jwt.sign({ id: caterer.id, caterer: true }, process.env.SECRET_KEY);
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
                .then((meal) => {
                    expect(meal).to.be.an('object');
                    expect(meal).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity','createdAt', 'updatedAt');
                    done();
                });
            })
    });
});

describe('Delete meal', () => {
    it('Should return nothing and status code 204', done => {
        CatererModel.findOne( { where: { email: catererDetails.email } })        
        .then(caterer => {
            const token = jwt.sign({ id: caterer.id, caterer: true }, process.env.SECRET_KEY);
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
    })
    
after(done => {
    CatererModel.destroy({ where: { email: catererDetails.email }})
    .then(() => {
        done();
    })
})