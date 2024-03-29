const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  avatar: {
    type: String,
    default: function () {
      return `https://joeschmoe.io/api/v1/${this.last_name}`;
    },
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  repeatPassword: { type: String, required: true },
  hourly_rate: { type: Number },
  description: { type: String, required: true },
});
const UserCollection = mongoose.model("user", userSchema);
module.exports = UserCollection;
