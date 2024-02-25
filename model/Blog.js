const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  blogHead: {
    type: String,
    required: true,
  },
  blogData: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
