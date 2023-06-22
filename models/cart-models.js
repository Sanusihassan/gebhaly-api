"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModel = void 0;
const mongoose_1 = require("mongoose");
const cart_schema_1 = require("../schema/cart-schema");
exports.CartItemModel = (0, mongoose_1.model)('CartItem', cart_schema_1.cartItemSchema);
