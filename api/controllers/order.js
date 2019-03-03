import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import Meal from './meal';
import OrderModel from '../models/Order';
import UserModel from '../models/User';
import OrderItemModel from '../models/OrderItem';

const { Op } = Sequelize;

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

    static async getOrders() {
        // let orders = JSON.parse(fs.readFileSync(p, 'utf-8'));
        // if (details) {
        //     const orderItems = JSON.parse(fs.readFileSync(pItems, 'utf-8'));
        //     orders = orders.map((order) => {
        //         const orderMapped = order;
        //         orderMapped.orderItems = orderMapped.orderItems
        //             .map(item => orderItems.find(i => i.id === item))
        //             .map(item => ({ ...Meal.fetchMealById(item.mealId), ...item }));
        //         return orderMapped;
        //     });
        // }
        // return orders;
        let orders = await OrderItemModel.findAll();
        orders = orders.map(order => order.dataValues);
        return orders;
    }

    static async add(order) {
        const user = await UserModel.findByPk(order.userId);
        if (user) {
            const createdOrder = await OrderModel.create();
            const orderItems = await OrderItemModel.findAll({
                where: {
                    id: {
                        [Op.or]: order.orderItems,
                    },
                    UserId: order.userId,
                },
            });
            createdOrder.addOrderItems(orderItems);
            createdOrder.setUser(user);
            await OrderItemModel.update(
                {
                    status: 'checked_out',
                },
                {
                    where: {
                        id: {
                            [Op.or]: order.orderItems,
                        },
                        UserId: order.userId,
                    },
                },
            );
            return {
                code: 200,
                status: 'success',
                ...createdOrder.dataValues,
            };
        }
        return {
            status: 'failure',
            code: 404,
            message: 'The user does not exist',
        };
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
