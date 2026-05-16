const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
  email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
    lowercase: true
	},
  password: {
		type: String,
		required: true,
	},
});
