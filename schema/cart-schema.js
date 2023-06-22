"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.cartItemSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
});
