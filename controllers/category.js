const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/error-handler');
const notify = require('../utils/notify');

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
        await Position.remove({category: req.params.categoryId});
        notify(res, 200, 'category_was_deleted', null);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function (req, res) {
    const category = new Category({
        name: req.body.name,
        user: req.user.userId,
        imageSrc: req.file ? req.file.path : ''
    });
    try {
        await category.save();
        notify(res, 201, 'category_was_created', category);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name
    };
    if (req.file) {
        updated.imageSrc = req.file.path;
    }
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.categoryId},
            {$set: updated},
            {new: true}
        );
        notify(res, 204, 'category_was_updated', category);
    } catch (e) {
        errorHandler(res, e);
    }
}
