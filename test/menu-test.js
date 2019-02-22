import chai from 'chai';
import request from 'chai-http';
import app from '../index';
import fs from 'fs';
import path from 'path'; 

const { expect, use } = chai;

use(request);

const p = path.join(__dirname, '../data', 'meals.json');

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
    })
})