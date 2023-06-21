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
exports.updateCartItemQuantity = void 0;
const cart_models_1 = require("../models/cart-models");
function updateCartItemQuantity(itemId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cartItem = yield cart_models_1.CartItemModel.findOne({ id: itemId });
            if (!cartItem) {
                throw new Error(`Could not find cart item with id ${itemId}`);
            }
            cartItem.quantity = quantity;
            yield cartItem.save();
            console.log(`Quantity updated for cart item ${cartItem.name}: ${cartItem.quantity}`);
        }
        catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    });
}
exports.updateCartItemQuantity = updateCartItemQuantity;
