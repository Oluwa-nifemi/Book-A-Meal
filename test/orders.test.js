import chai from 'chai';
import request from 'chai-http';
import app from '../index';
import fs from 'fs';
import path from 'path'; 

const { expect, use } = chai;

use(request);

const p = path.join(__dirname, '../data', 'menu.json');

const apiVersion = '/api/v1';

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