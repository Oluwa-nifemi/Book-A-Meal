import fs from 'fs';
import path from 'path';
import Meal from './meal';

const p = path.join(__dirname, '../data', 'orders.json');

const pItems = path.join(__dirname, '../data', 'order-items.json');

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

    static getOrders(details = true) {
        let orders = JSON.parse(fs.readFileSync(p, 'utf-8'));
        if (details) {
            const orderItems = JSON.parse(fs.readFileSync(pItems, 'utf-8'));
            orders = orders.map((order) => {
                const orderMapped = order;
                orderMapped.orderItems = orderMapped.orderItems
                    .map(item => orderItems.find(i => i.id === item))
                    .map(item => ({ ...Meal.fetchMealById(item.mealId), ...item }));
                return orderMapped;
            });
        }
        return orders;
    }

    add() {
        const orders = this.constructor.getOrders(false);
        const id = orders.length + 1;
        orders.push({ id, ...this });
        fs.writeFileSync(p, JSON.stringify(orders));
        return { id, ...this };
    }

    static getUserOrders(userId) {
        let orders = this.getOrders(true);
        orders = orders.filter(order => order.userId === userId);
        return orders;
    }

    static editState(id, state) {
        const orders = this.getOrders(false);
        const order = orders.find(e => e.id === id);
        if (order) {
            order.state = state;
            fs.writeFileSync(p, JSON.stringify(orders));
        }
    }

    static delete(id) {
        let orders = this.getOrders(false);
        orders = orders.filter(order => order.id !== id || order.state !== 'pending');
        fs.writeFileSync(p, JSON.stringify(orders));
    }
}

export default Order;
