const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
   platform: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
   },
   productId: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
   },
   userId: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
   },
   username: {
      type: String,
      minlength: 5,
      maxlength: 255,
      trim: true,
   },
   data: {
      point: {
         type: Number,
         default: 0,
         min: 0,
      },
      finishedPost: [String],
      badge: {
         type: Array,
      },
   },
});

userSchema.methods.generateAuthToken = function () {
   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
};

const User = mongoose.model("User", userSchema);
export default User;
