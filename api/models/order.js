import fs from 'fs';
import path from 'path';
import Meal from './meal';

const p = path.join(__dirname, '../data', 'orders.json');

const p_items = path.join(__dirname, '../data', 'order-items.json');

class Order {
    constructor({
        userId,
        date,
        orderItems,
        state,
    }) {
        Object.assign(this, {
            userId, date, orderItems, state,
        });
    }

    static getOrders() {
        const orders = JSON.parse(fs.readFileSync(p, 'utf-8'));
        const orderItems = JSON.parse(fs.readFileSync(p_items,'utf-8'));
        orders.forEach(order => {
            order.orderItems = order.orderItems.map(item => orderItems.find(i => i.id === item));
            order.orderItems = order.orderItems.map(item => ({ ...Meal.fetchMealById(item.mealId), ...item }))
        });
        return orders;
    }

    add() {
        const orders = JSON.parse(this.constructor.getOrders());
        const id = orders.length + 1;
        orders.push({ id, ...this });
        fs.writeFileSync(p, JSON.stringify(orders));
        return { id, ...this };
    }

    static getUserOrders(userId) {
        let orders = this.getOrders();
        orders = orders.filter(order => order.userId === userId);
        return orders;
    }

    static editState(id, state) {
        const orders = this.getOrders();
        const order = orders.find(e => e.id === id);
        if (order) {
            order.state = state;
            fs.writeFileSync(p, JSON.stringify(orders));
        }
    }

    static delete(id) {
        let orders = this.getOrders();
        orders = orders.filter(order => order.id !== id || order.state !== 'pending');
        fs.writeFileSync(p, JSON.stringify(orders));
    }
}

export default Order;
