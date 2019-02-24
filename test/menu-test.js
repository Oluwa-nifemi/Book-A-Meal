import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import fs from 'fs';
import path from 'path'; 
import Menu from '../api/models/menu';

const { expect, use } = chai;

use(request);

const p = path.join(__dirname, '../api/data', 'menu.json');

const apiVersion = '/api/v1';

describe('Get Menu', () => {
    it('Should return menu for the day', () =>{
        chai.request(app)
        .get(`${apiVersion}/menu`)
        .then(res => res.body)
        .then(menu => {
            expect(menu).to.be.an('object');
            expect(menu).to.have.all.keys('date','meals')
        })
        .catch(err => {
            console.log(err.message)
        })
    })
})

describe('Add to Menu', () => {
    it('Should return meal',() => {
        chai.request(app)
        .post(`${apiVersion}/menu`)
        .send({
            "id" : 5,
            "quantity" : 7,
        })
        .then(res => res.body)
        .then(meal => {
            expect(meal).to.be.an('object');
            expect(meal).to.have.all.keys('id','quantity');
        })
        .catch(err => {
            console.log(err.message)
        })
    })
})

describe('Edit menu', () => {
    it('Should return meal',() => {
        chai.request(app)
        .put(`${apiVersion}/menu`)
        .send({
            "id" : 3,
            "quantity" : 1,
        })
        .then(res => res.body)
        .then(meal => {
            expect(meal).to.be.an('object');
            expect(meal).to.have.all.keys('id','quantity');
        })
        .catch(err => {
            console.log(err.message)
        })
    })
})

describe('Delete meal from menu', () => {
    it('Should return empty reply', () => {
        chai.request(app)
        .delete(`${apiVersion}/menu/5`)
        .then((res) => {
            expect(res.text).to.be.equal('');
        })
        .catch((err) => {
            console.log(err.message);
        });
    })
})