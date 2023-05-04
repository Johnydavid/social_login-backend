const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacebookUserSchema = new Schema({
  displayName: {
    type: String,
    required: true,
  },

  facebookId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FacebookUser = mongoose.model("FacebookUser", FacebookUserSchema);

module.exports = FacebookUser;
