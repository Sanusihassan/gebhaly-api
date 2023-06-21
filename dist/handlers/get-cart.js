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
exports.getCardItems = void 0;
const cart_models_1 = require("../models/cart-models");
function getCardItems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cartCollections = yield cart_models_1.CartItemModel.find().lean().exec();
            return cartCollections;
        }
        catch (err) {
            console.warn('Error retrieving card collections:', err);
            return [];
        }
    });
}
exports.getCardItems = getCardItems;
