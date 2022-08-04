const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: false,
            lowercase: true,
            minlength: 5,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) throw new Error("Invalid email address");
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes("password"))
                    throw new Error("password can't have 'password' word");
            },
        },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);

module.exports = User;