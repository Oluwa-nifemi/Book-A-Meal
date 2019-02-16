
// import express from 'express';
// import Meal from './models/meal';
// import Menu from './models/menu';
// import OrderItem from './models/order-item';
// import Order from './models/order';
const express = require('express');
const Meal = require('./models/meal');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get('/api/v1/meals', (req, res) => {
    const meal = Meal.fetchMeals();
    res.send(meal);
});

app.post('/api/v1/meals', (req,res) => {
    const meal = new Meal({...req.body});
    res.send(meal.add());
});
app.listen(PORT);
