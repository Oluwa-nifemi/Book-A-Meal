import fs from 'fs';
import OrderItemModel from '../models/OrderItem';
import MealModel from '../models/Meal';
import UserModel from '../models/User';

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

    static async getOrderItems(id) {
        let orders = await OrderItemModel.findAll({ where: { UserId: id, status: 'cart' } });
        orders = orders.map(order => order.dataValues);
        return orders;
    }

    static async add(item) {
        const meal = await MealModel.findOne({ where: { id: item.mealId } });
        const prevItem = await OrderItemModel.findOne({
            include: [
                {
                    model: MealModel,
                    where: { id: item.mealId },
                },
                {
                    model: UserModel,
                    where: { id: item.userId },
                },
            ],
        });
        if (prevItem) {
            return {
                status: 'failure',
                code: 409,
                message: 'The item is already on your cart. You can increase the amount',
            };
        }
        if (meal) {
            const i = await OrderItemModel.create({ quantity: item.quantity });
            const user = await UserModel.findOne({ where: { id: item.userId } });
            if (!user) {
                return {
                    status: 'failure',
                    code: 404,
                    message: 'The user does not exist',
                };
            }
            i.addMeal(meal);
            i.setUser(user);
            return {
                status: 'success',
                code: 200,
                ...i.dataValues,
                meal,
            };
        }
        return {
            status: 'failure',
            code: 404,
            message: 'The meal does not exist',
        };
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
