const mongoose = require("mongoose");

const ownerSchema = mongooseSchema({
  fullname: String,
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("Owner", ownerSchema);
