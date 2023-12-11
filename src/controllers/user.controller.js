const User = require("../models/User.js");
const response = require("../helpers/response.js");

module.exports.loginUser = async (req, res) => {
   const { userId, productId, platform } = req.body;
   const user = await User.findOne({ userId, productId, platform });

   if (!user) await this.addUser(req, res);

   let authToken = user?.generateAuthToken();
   res.setHeader("x-auth-token", authToken);

   response.success(req, res, {
      id: user._id,
      "x-auth-token": authToken,
   });
};

module.exports.addUser = async (req, res) => {
   let { platform, userId, productId } = req.body;

   let user = await User.findOne({ platform, userId, productId });
   if (user)
      return response.error(req, res, "User already added.", response.API_STATUS.BAD_REQUEST);

   user = { userId, productId, platform };
   user = new User(user);
   await user.save();

   let authToken = user.generateAuthToken();
   res.setHeader("x-auth-token", authToken);

   response.success(req, res, {
      id: user._id,
      "x-auth-token": authToken,
   });
};

module.exports.addData = async (req, res) => {
   let user = await User.findOne({ _id: req.user._id });
   user.data = req.body.data;
   await user.save();

   response.success(req, res, "User data added");
};

module.exports.getData = async (req, res) => {
   let user = await User.findOne({ _id: req.user._id });

   response.success(req, res, {
      data: user.data,
   });
};

module.exports.getLeaderboard = async (req, res) => {
   let user = await User.find({ productId: req.body.productId })
      .sort({ "data.point": -1 })
      .limit(10);

   response.success(req, res, {
      data: user,
   });
};
