import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import CatererModel from '../api/models/Caterer';
import UserModel from '../api/models/User';
import OrderItemModel from '../api/models/OrderItem';
import MealModel from '../api/models/Meal';
import jwt from 'jsonwebtoken';

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';

let catererId, userId, orderItemId, mealId, orderId;

before(done => {
    CatererModel.create({
        email: "ordercat@gmail.com",
        password: "password",
        name: "Test User"
    }).then((caterer) => {
        catererId = caterer.id;
            UserModel.create({
            email: "orderuse@gmail.com",
            password: "password",
            name: "Test User"
        })
        .then((user) => {
            userId = user.id;
            MealModel.create({
                title:"Indomie and Fregg",
                description:"Quite tasty filling",
                image:"image3.jpg",
                price:11.6,
                defaultQuantity:50
            })
            .then((meal) => {
                mealId = meal.id;
                OrderItemModel.create({
                    "mealId": meal.id,
                    userId,
                    "quantity": 10,
                    "status": "cart"
                })
                .then((item) => {
                    orderItemId = item.id;
                    done();
                })
            })
        })  
    })
})

describe('Add order', () => {
    it('Should return status succes', done => {
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);        
        chai.request(app)
            .post(`${apiVersion}/orders`)
            .set('bearer', token) 
            .send({
                userId,
                "orderItems" : [orderItemId],
                "address" : "5 Unity Estate Olambe"
            })
            .then(res => res.body)
            .then(body => {
                expect(body).to.be.an('object');
                expect(body.status).to.equal('success');
                orderId = body.data.id;
                done();
            })           
    })
})

describe('Get all orders', () => {
    it('Should return all orders', done => {
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
        chai.request(app)
            .get(`${apiVersion}/orders`)    
            .set('bearer', token) 
            .then(res => res.body)
            .then(body => {
                expect(body.status).to.equal('success');
                expect(body.data).to.be.an('array');
                done();
            })
        })
})

describe('Get user orders', () => {
    it('Should return all orders', done => {
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
        chai.request(app)
            .get(`${apiVersion}/orders/${userId}`)    
            .set('bearer', token) 
            .then(res => res.body)
            .then(body => {
                expect(body.status).to.equal('success');
                expect(body.data).to.be.an('array');
                done();
            })
    })
})

describe('Edit order', () => {
    it('Should return status success', done => {
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
        chai.request(app)
            .put(`${apiVersion}/orders/${orderId}/delivered`)
            .set('bearer', token) 
            .then(req => req.body)
            .then(body => {
                expect(body.status).to.equal('success');
                expect(body.message).to.equal('The order has been edited');
                done();
            })            
    })
})

describe('Delete order', () => {
    it('Should return empty response',done => {
        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
        chai.request(app)
            .delete(`${apiVersion}/orders/${orderId}`)
            .set('bearer', token) 
            .then(res => res.text)            
            .then((text) => {
                expect(text).to.equal('');
                done();
            })
    })
})

after((done) => {
    CatererModel.destroy({where : { id: catererId } })
    .then(() => {
        OrderItemModel.destroy({where : { id: orderItemId } })
        .then(() => {
            MealModel.destroy({where : { id: mealId } })
            .then(() => {
                UserModel.destroy({where : { id: userId } })
                .then(() => {
                    done();
                })
            })
        })
    })
})
