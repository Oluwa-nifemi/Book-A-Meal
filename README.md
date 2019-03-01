
# Book-A-Meal
A meal booking app built with React and Node

[![Build Status](https://travis-ci.org/Oluwa-nifemi/Book-A-Meal.svg?branch=develop)](https://travis-ci.org/Oluwa-nifemi/Book-A-Meal)
[![Coverage Status](https://coveralls.io/repos/github/Oluwa-nifemi/Book-A-Meal/badge.svg?branch=develop)](https://coveralls.io/github/Oluwa-nifemi/Book-A-Meal?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/61a70bd38b323f103756/test_coverage)](https://codeclimate.com/github/Oluwa-nifemi/Book-A-Meal/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/61a70bd38b323f103756/maintainability)](https://codeclimate.com/github/Oluwa-nifemi/Book-A-Meal/maintainability)

## Features.
1. Users can create an account and log in
2. Admin (Caterer) can manage (i.e: add, modify and delete) meal options in
the application. Examples of meal options are: Beef with rice, Beef with fries etc
3. Admin (Caterer) can setup menu for a specific day by selecting from the
meal options available on the system.
4. Authenticated users (customers) can see the menu for a specific day and
select an option out of the menu.
5. Authenticated users (customers) should be able to change their meal choice.
6. Admin (Caterer) should be able to see the orders made by the user
7. Admin should be able to see amount of money made by end of day

## Getting Started.
### Clone the repo
```bash
git clone 'https://github.com/Oluwa-nifemi/Book-A-Meal.git'
```
### Prerequisites
The following tools will be needed to run this application successfully:
* Node v10.15.0 or above
* Npm v6.4 or above

### Endpoints
* GET api/v1/meals/ Caterer can get all meals options they uploaded
* POST api/v1/meals/ Caterer can add meal options linked to their account
* PUT api/vi/meals/:mealId Caterer can update their meal options
* DELETE api/v1/meals/:mealId Caterer can delete their meal options
* GET api/v1/menu/ Caterer and Users can Get the menu for the day
* POST api/v1/menu/ Caterer can Set a menu for the day
* PUT api/v1/menu/ Caterer can Edit a menu for the day
* DELETE /api/v1/menu/:mealId Caterer can delete meal from menu
* GET api/v1/order-items/:userid Get All Orders in Cart
* POST api/v1/order-items/ Add Meal to Cart
* PUT api/v1/order-items/ Edit Meal Quantity in Cart
* DELETE api/v1/order-items/:id Delete Meal in Cart
* GET api/v1/orders Caterer can get all order
* POST api/v1/orders Users can checkout
* PUT api/v1/orders/:id/:state Caterer can change state of order to delivered
* DELETE api/v1/orders/:id User can delete order **while** order is still pending

### Installation
**On your Local Machine**
* Pull the develop branch off this repository
* Run ```bash npm install``` to install all dependencies
* Run npm start to start the app
* Access endpoints on localhost:3000

### Running the tests
Run ```bash npm test``` in the termincal for the cloned folder

### Built With
* <a href = 'http://www.nodejs.org/'>Node.js</a> - Runtime Environment

### Author
* Adeyemi Oluwanifemi

The documentation for the API can be found at https://documenter.getpostman.com/view/6781270/S11Huyy2
