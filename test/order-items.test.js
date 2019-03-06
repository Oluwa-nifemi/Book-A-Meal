import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import UserModel from '../api/models/User';
import MealModel from '../api/models/Meal';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';

const mealDetails = {
    title: 'Test Meal 2',
    description: 'Test',
    image: 'image3.jpg',
    price: 11.6,
    defaultQuantity: 50,
};

const userDetails = {
    email: "ordertest@gmail.com",
    password: "password",
    name: "Test User"
}

let userId, mealId, id;

before(done => {
    UserModel.create(userDetails).then((user) => {
        userId = user.id;
        MealModel.create(mealDetails)
        .then((meal) => {
            mealId = meal.id;
            done();
        })
    });
})

describe('Add order item', () => {
    it('Should return status success', done => {
            const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
            chai.request(app)
                .post(`${apiVersion}/order-items`)
                .set('bearer', token) 
                .send({
                    mealId,
                    userId,
                    "quantity": 2,
                    "status": "cart"
                })            
                .then(res => res.body)
                .then(orderItem => {
                    id = orderItem.data.id;
                    expect(orderItem).to.be.have.all.keys('status','data');
                    expect(orderItem.status).to.be.equal('success');
                    expect(orderItem.data).to.be.an('object');
                    done();
                })    
    });
});


describe('Get order items', () => {
    it('Should return array of order items', done => {
            const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
            chai.request(app)
                .get(`${apiVersion}/order-items/${userId}`)
                .set('bearer', token) 
                .then(res => res.body)
                .then((orderItems) => {
                    expect(orderItems).to.be.have.all.keys('status','data');
                    expect(orderItems.status).to.be.equal('success');
                    expect(orderItems.data).to.be.an('array');
                    done();
                })
    })
})

describe('Edit order item',() => {
    it('Should return added item', done => {
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
        chai.request(app)
            .put(`${apiVersion}/order-items`)
            .set('bearer', token)             
            .send({
                id,
                userId,
                "quantity": 10,
            })
            .then(res => res.body)
            .then(orderItem => {
                expect(orderItem).to.be.have.all.keys('status','data');
                expect(orderItem.status).to.be.equal('success');
                expect(orderItem.data).to.be.an('object');
                done();
            })
    })
})

describe('Delete order item', () => {
    it('Should return nothing', done => {
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
        chai.request(app)
            .delete(`${apiVersion}/order-items/${id}`)
            .set('bearer', token)             
            .then(res => res.text)
            .then((body) => {
                expect(body).to.equal('');
                done();
            })
    });
})

after(done => {
    UserModel.destroy({ where: { email: userDetails.email }})
    .then(() => {
        done();
    })
});
