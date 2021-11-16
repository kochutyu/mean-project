const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/error-handler');

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({user: req.user.id});
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById({user: req.params.categoryId});
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Category.remove({_id: req.params.categoryId});
        await Position.remove({category: req.params.categoryId})
        res.status(200).json({message: 'category_was_deleted'});
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
}
