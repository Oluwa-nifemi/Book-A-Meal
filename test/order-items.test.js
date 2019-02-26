import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';

//Get id of item added during add order item test to delete during delete order item test
let id;

describe('Get order items', () => {
    chai.request(app)
        .get(`${apiVersion}/order-items/1`)
        .then(res => res.body)
        .then(items => {
            expect(items).to.be.an('array');
        })
        .catch(err => {
            console.log(err)
        })
});

describe('Add order item', () => {
    it('Should return added item', () => {
        chai.request(app)
            .post(`${apiVersion}/order-items`)
            .send({
                "mealId": 5,
                "userId": 2,
                "quantity": 2,
                "status": "cart"
            })
            .then(res => res.body)
            .then(order => {
                id = order.id;
                expect(order).to.be.an('object');
                expect(order).to.have.all.keys('mealId','userId','id','quantity','status');                
            })
            .then(() => {
                describe('Edit order item',() => {
                    it('Should return added item', () => {
                        chai.request(app)
                            .put(`${apiVersion}/order-items`)
                            .send({
                                id,
                                "mealId": 1,
                                "userId": 2,
                                "quantity": 10,
                                "status": "cart"
                            })
                            .then(res => res.body)
                            .then(order => {
                                expect(order).to.be.an('object');
                            })
                            .then(() => {
                                describe('Delete order item', () => {
                                    it('Should return empty response', () => {
                                        chai.request(app)
                                        .delete(`${apiVersion}/order-items/${id}`)
                                        .then((res) => {
                                            expect(res.text).to.be.equal('');
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                    })
                                })
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    });
                })
            })
            .catch(err => {
                console.log(err)
            })
    });
});
