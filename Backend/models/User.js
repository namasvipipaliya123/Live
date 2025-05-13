const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  otp: { type: String  },
  otpExpires: { type: Date  },
  isVerified: { type: Boolean },
  token: { type: String, default: null },

});

module.exports = mongoose.model('User', userSchema);
