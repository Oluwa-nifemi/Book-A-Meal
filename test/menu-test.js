import chai from 'chai';
import request from 'chai-http';
import app from '../index';
import fs from 'fs';
import path from 'path'; 
import Menu from '../models/menu';

const { expect, use } = chai;

use(request);

const p = path.join(__dirname, '../data', 'menu.json');

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
            const menu = Menu.getMenu();
            menu.meals = menu.meals.filter(m => m.id !== meal.id);
            fs.writeFileSync(p,JSON.stringify(menu));
        })
    })
})