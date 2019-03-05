import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
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

    static async getOrders(req, res) {
        let orders = await OrderModel.findAll({ include: [OrderItemModel] });
        orders = orders.map(order => order.dataValues);
        res.status(200).send(orders);
    }

    static async add(req, res) {
        const order = req.body;
        const user = await UserModel.findByPk(order.userId);
        if (user) {
            const createdOrder = await OrderModel.create();
            const orderItems = await OrderItemModel.findAll({
                where: {
                    id: order.orderItems,
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
            res.status(200).send(createdOrder.dataValues);
        }
        res.status(404).send('User not found');
    }

    static async getUserOrders(req, res) {
        const UserId = req.params.userid;
        if (UserId !== req.params.tokenId) {
            res.status(403).send('You\'re not allowed to access that');
        }
        let orders = await OrderModel.findAll({ where: { UserId }, include: [OrderItemModel] });
        orders = orders.map(order => order.dataValues);
        res.status(200).send(orders);
    }

    static async editState(req, res) {
        const { id, state } = req.params;
        const response = await OrderModel.update({ state }, { where: { id }, returning: true });
        if (response[0]) {
            res.status(200).send('The order has been edited');
        }
        res.status(404).send('The order was not found');
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await OrderModel.destroy({ where: { id, UserId: req.params.tokenId } });
            res.status(204).send();
        } catch (err) {
            res.status(500).send('Something went wrong, please try again');
        }
    }
}

export default Order;
