const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL || "127.0.0.1";
const DB_PORT = process.env.DB_PORT || 27017;

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/paytm`);

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  DB_PORT,
  DB_URL,
  Account,
};
