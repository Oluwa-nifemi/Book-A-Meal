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
        let orders = await OrderModel.findAll({ include: [OrderItemModel] });
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

    static async getUserOrders(UserId) {
        let orders = await OrderModel.findAll({ where: { UserId }, include: [OrderItemModel] });
        orders = orders.map(order => order.dataValues);
        return orders;
    }

    static async editState(id, state) {
        const response = await OrderModel.update({ state }, { where: { id }, returning: true });
        if (response[0]) {
            return {
                status: 'success',
                code: 200,
            };
        }
        return {
            status: 'failure',
            code: 404,
            message: 'The order does not exist',
        };
    }

    static async delete(id) {
        try {
            await OrderModel.destroy({ where: { id } });
            return {
                status: 'success',
                code: 204,
                message: 'The order has been deleted',
            };
        } catch (err) {
            return {
                status: 'failure',
                code: 500,
                message: 'Something went wrong, please try again',
            };
        }
    }
}

export default Order;
