import dotenv from 'dotenv';
import chai from 'chai';
import request from 'chai-http';
import app from '../api/index';
import UserModel from '../api/models/User';
import jwt from 'jsonwebtoken';
import MealModel from '../api/models/Meal';

dotenv.config();

const { expect, use } = chai;

use(request);

const apiVersion = '/api/v1';

const userDetails = {
    email: "menutest@gmail.com",
    password: "password",
    name: "Test User"
}

let id;

before(done => {
    UserModel.create(userDetails).then(() => {
        MealModel.create({
            title:"Indomie and Fregg",
            description:"MenuTest",
            image:"image3.jpg",
            price:11.6,
            defaultQuantity:50
        })
        .then((meal) => {
            id = meal.id;
            done();
        })
    });
})

describe('Get menu', () => {
    it('Should return menu', done => {
        UserModel.findOne( { where: { email: userDetails.email } })
        .then(user => {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            chai.request(app)
            .get(`${apiVersion}/menu`)
            .set('bearer', token) 
            .then(res => res.body)
            .then((body) => {
                expect(body).to.have.all.keys('status','data');
                expect(body.status).to.be.equal('success');
                expect(body.data).to.have.all.keys('id','date','meals','createdAt','updatedAt');
                done();
            })
        })          
    });
})
describe('Post to menu', () => {
        it('Should return menu array', done => {
            UserModel.findOne( { where: { email: userDetails.email } })
            .then(user => {
                const token = jwt.sign({ id: user.id,caterer: true }, process.env.SECRET_KEY);
                chai.request(app)
                    .post(`${apiVersion}/menu`)
                    .set('bearer', token)                     
                    .send({
                        id,
                        "quantity" : 7,
                    })
                    .then(res => res.body)
                    .then(body => {
                        expect(body).to.be.have.keys('status','message');
                        expect(body.status).to.be.equal('success');
                        expect(body.message).to.be.equal('The meal was added to the database');
                        done();
                    })
        })
    });
});

describe('Edit meal in menu', () => {
    it('Should return status and success message', done => {
        UserModel.findOne( { where: { email: userDetails.email } })
            .then(user => {
                const token = jwt.sign({ id: user.id,caterer: true }, process.env.SECRET_KEY);                
                chai.request(app)
                .put(`${apiVersion}/menu`)
                .set('bearer', token)                                     
                .send({
                    id,
                    "quantity" : 6,
                })
                .then(res => res.body)
                .then((body) => {
                    expect(body).to.be.have.keys('status','message');
                    expect(body.status).to.be.equal('success');
                    expect(body.message).to.be.equal('The meal was successfully edited');
                    done();
                })
                .catch(console.log)
            }); 
    });
});

describe('Delete meal from menu', () => {
    it('Should return empty reply', done => {
        UserModel.findOne( { where: { email: userDetails.email } })
            .then(user => {
                const token = jwt.sign({ id: user.id,caterer: true }, process.env.SECRET_KEY);                
                chai.request(app)
                .delete(`${apiVersion}/menu/${id}`)
                .set('bearer', token)                     
                .then((res) => {
                    expect(res.text).to.be.equal('');
                    done();
                })
                .catch((err) => {
                    console.log(err.message);
                });
            });
        }); 
});

after(done => {
    UserModel.destroy({ where: { email: userDetails.email }})
    .then(() => {
        MealModel.destroy({ where: { description: 'MenuTest' }})
        .then(() => {
            done();
        })
    })
})
