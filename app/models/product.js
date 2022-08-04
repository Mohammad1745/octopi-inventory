const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            minlength: 5,
        },
        manufacturer: {
            type: String,
            unique: false,
            required: true,
            trim: true,
            lowercase: true,
        },
        buy_price: {
            type: Number,
            required: true,
            trim: true,
        },
        sell_price: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;