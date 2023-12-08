const Joi = require('joi');
const validate = require('./validator.js');

module.exports.addUser = (req, res, next) => validate(req, res, next, {
    platform: Joi.string().required(),
    userId: Joi.string().required(),
    productId: Joi.string().required(),
});

module.exports.addData = (req, res, next) => validate(req, res, next, {
    data: Joi.object().unknown().required(),
});

module.exports.getLeaderboard = (req, res) => validate(req, res, {
    productId: Joi.string().required(),
});