const User = require("../models/User.js");
const response = require("../helpers/response.js");

module.exports.addUser = async (req, res) => {
    let { platform, userId, productId } = req.body;

    let user = await User.findOne({ platform, userId, productId });
    if (user) return response.error(req, res, "User already added.", response.API_STATUS.BAD_REQUEST);

    user = { userId, productId };
    user = new User(user);
    await user.save();

    let authToken = user.generateAuthToken();
    res.setHeader('x-auth-token', authToken);

    response.success(req, res, {
        'x-auth-token': authToken,
    });
};

module.exports.addData = async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });
    user.data = req.body.data;
    await user.save()

    response.success(req, res, "User data added");
};

module.exports.getData = async (req, res) => {
    let user = await User.findOne({ _id: req.user._id });

    response.success(req, res, {
        data: user.data
    });
};