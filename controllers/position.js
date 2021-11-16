const Position = require('../models/Position');
const errorHandler = require('../utils/error-handler');
const notify = require('../utils/notify');

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save();
        notify(res, 201, 'position_has_been_created', position);
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Position.remove({_id: req.params.positionId});
        notify(res, 200, 'position_was_deleted', null);
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.positionId},
            {$set: req.body},
            {new: true}
            );
        notify(res, 204, 'position_was_updated', position);
    } catch (e) {
        errorHandler(res, e)
    }
}
