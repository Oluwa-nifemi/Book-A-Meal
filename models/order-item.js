import fs from 'fs';
import path from 'path';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'order-items.json');

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
        const orderItems = JSON.parse(fs.readFileSync(p));
        const orderItemsFiltered = orderItems.filter(item => item.userId === id && item.status === 'cart');
        return orderItemsFiltered;
    }
}

export default OrderItem;
