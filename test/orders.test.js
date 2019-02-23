import chai from 'chai';
import request from 'chai-http';
import app from '../index';
import fs from 'fs';
import path from 'path'; 

const { expect, use } = chai;

use(request);

const p = path.join(__dirname, '../data', 'menu.json');

const apiVersion = '/api/v1';

//Get id of item added during add order test to delete during delete order test
let id;

describe('Get orders', () => {
    it('Should return all orders', () => {
        chai.request(app)
            .get(`${apiVersion}/orders`)
            .then(res => JSON.parse(res.body))
            .then(orders => {
                expect(orders).to.be.an('array')
            })
    })
})

describe('Get orders by user id', () => {
    it('Should return all orders belong to that user', () => {
        chai.request(app)
            .get(`${apiVersion}/orders/1`)
            .then(res => res.body)
            .then(orders => {
                expect(orders).to.be.an('array')
                const invalid = orders.filter(order => order.userId !== 1).length;
                expect(invalid).to.be.equal(0);
            })
    })
})

describe('Add order',() => {
    it('Should return the added order', () => {
        chai.request(app)
            .post(`${apiVersion}/orders`)
            .send(
                {
                    "userId" : 1,
                    "date" : "27-12-12",
                    "orderItems" : [1,4],
                    "state" : "pending"
                }
            )
            .then(res => res.body)
            .then((order) => {
                id = order.id;
                expect(order).to.be.an('object');
            })
    })
})

describe('Delete order', () => {
    it('Should return empty response', () => {
        chai.request(app)
        .delete(`${apiVersion}/orders/${id}`)
        .then((res) => {
            expect(res.text).to.be.equal('');
        })
        .catch((err) => {
            console.log(err.message);
        });
    })
})

describe('Edit order state',() => {
    it('Should return empty response', () => {
        chai.request(app)
        .put(`${apiVersion}/orders/1/delivered`)
        .then((res) => {
            expect(res.text).to.be.equal('');
        })
        .catch((err) => {
            console.log(err.message);
        });
    })
})