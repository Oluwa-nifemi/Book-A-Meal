// import fs from 'fs';
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'meals.json');

class Meal {
    constructor({
        id,
        title,
        description,
        image,
        price,
        defaultQuantity,
    }) {
        Object.assign(this, {
            id, title, description, image, price, defaultQuantity,
        });
    }

    static fetchMeals() {
        return fs.readFileSync(p);
    }
}

// export default Meal;

module.exports = Meal;
