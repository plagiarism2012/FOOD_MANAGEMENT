const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  images: [{
    type: String
  }],
  foods: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    }
  }],
  phoneNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String,
    required: true
  },
  acceptedBy: {
    type: String,
    default: "none"
  }
});

const MyModel = mongoose.model('Post', PostSchema);
module.exports = MyModel;
