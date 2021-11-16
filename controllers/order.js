const Order = require('../models/Order');
const errorHandler = require('../utils/error-handler');
const notify = require('../utils/notify');

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            user: req.user.id,
            date: {}
        }

        if (req.query.startDate) {
            query.date['$gte'] = req.query.startDate;
        }

        if (req.query.endDate) {
            $gte: req.query.startDate
            query.date['$lte'] = req.query.endDate;
        }

        if (req.query.order) {
            query.order = req.query.order;
        }

        const orders = await Order
            .find((query))
            .sort({date: -1})
            .skip(res.query && res.query.offset ? +res.query.offset : 0)
            .limit(res.query && res.query.limit ? +res.query.limit : 10);

        res.status(200).json(orders);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function (req, res) {
    try {
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1});

        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save();
        notify(res, 201, 'order_was_created', order);
    } catch (e) {
        errorHandler(res, e);
    }
}
