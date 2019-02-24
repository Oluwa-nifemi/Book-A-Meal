import fs from 'fs';
import path from 'path';
import Meal from './meal';

const p = path.join(__dirname, '../data', 'order-items.json');

class OrderItem {
    constructor({
        mealId,
        userId,
        quantity,
        status,
    }) {
        Object.assign(this, {
            mealId, userId, quantity, status,
        });
    }

    static getOrderItems(id) {
        let orderItems = JSON.parse(fs.readFileSync(p));
        orderItems = orderItems.map(item => ({ ...Meal.fetchMealById(item.mealId), ...item }));
        const orderItemsFiltered = orderItems.filter(item => item.userId === id && item.status === 'cart');
        return orderItemsFiltered;
    }

    add() {
        const orderItems = JSON.parse(fs.readFileSync(p));
        if (orderItems.find(item => item.mealId === this.mealId && item.userId === this.userId)) {
            return { err: 'Meal already exists you can increase the quantity in your cart' };
        }
        const id = orderItems.length + 1;
        orderItems.push({ id, ...this });
        fs.writeFileSync(p, JSON.stringify(orderItems));
        return { id, ...this };
    }

    static edit(item) {
        const orderItems = JSON.parse(fs.readFileSync(p));
        const index = orderItems.findIndex(elem => elem.id === item.id);
        if (index !== -1) {
            orderItems[index] = item;
            fs.writeFileSync(p, JSON.stringify(orderItems));
            return item;
        }
        return { err: "Meal doesn't exist database" };
    }

    static delete(id) {
        let orderItems = JSON.parse(fs.readFileSync(p));
        orderItems = orderItems.filter(item => item.id !== id);
        fs.writeFileSync(p, JSON.stringify(orderItems));
    }
}

export default OrderItem;
