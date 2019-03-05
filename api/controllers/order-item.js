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

    static async getOrderItems(req, res) {
        const id = parseInt(req.params.userid, 10);
        let orders = await OrderItemModel.findAll({ where: { UserId: id, status: 'cart' }, include: [MealModel] });
        orders = orders.map(order => order.dataValues);
        res.status(200).send(orders);
    }

    static async add(req, res) {
        const item = req.body;
        const meal = await MealModel.findOne({ where: { id: item.mealId } });
        const prevItem = await OrderItemModel.findOne({
            where: { status: 'cart' },
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
            res.status(409).send('The item is already on your cart');
        }
        if (meal) {
            const i = await OrderItemModel.create({ quantity: item.quantity });
            const user = await UserModel.findOne({ where: { id: item.userId } });
            if (!user) {
                res.status(404).send('User does not exist');
                return;
            }
            i.addMeal(meal);
            i.setUser(user);
            res.status(200).send({ ...i.dataValues, meal });
        }
        res.status(404).send('The meal does not exist');
    }

    static async edit(req, res) {
        const item = req.body;
        const response = await OrderItemModel.update(
            { quantity: item.quantity },
            {
                where: { id: item.id, UserId: item.userId },
                returning: true,
            },
        );
        if (response[0]) {
            const orderItem = response[1][0];
            res.status(200).send(orderItem);
            return;
        }
        res.status(404).send('The item is not on your cart');
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id, 10);
        await OrderItemModel.destroy({ where: { id, status: 'cart' } });
        res.status(204).send();
    }
}

export default OrderItem;
