"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const mongoose_1 = require("mongoose");
const cart_schema_1 = require("../schema/cart-schema");
const CartItemModel = (0, mongoose_1.model)('cartitem', cart_schema_1.cartItemSchema);
function addToCart(items) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const item of items.cart) {
                const newItem = {
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: item.quantity,
                };
                const filter = { id: item.id };
                const update = { $inc: { quantity: item.quantity } };
                const options = { new: true, upsert: true };
                const result = yield CartItemModel.findOneAndUpdate(filter, update, options);
                if (!result) {
                    throw new Error(`Item not found in cart for id: ${item.id}`);
                }
            }
        }
        catch (error) {
            console.error('Error adding item to cart:', error);
        }
    });
}
exports.addToCart = addToCart;
