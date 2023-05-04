const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GithubUserSchema = new Schema({
  displayName: {
    type: String,
    required: true,
  },

  githubId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GithubUser = mongoose.model("GithubUser", GithubUserSchema);

module.exports = GithubUser;
