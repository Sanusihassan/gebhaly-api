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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocuments = void 0;
/**
 * i want a similar function but to get all of the card collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const insert_initial_data_1 = require("./insert-initial-data");
const db = mongoose_1.default.connection;
const ProductModel = db.model('Products', insert_initial_data_1.productSchema);
function getDocuments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield ProductModel.find().lean().exec();
            return products;
        }
        catch (err) {
            console.warn('Error retrieving documents:', err);
            return [];
        }
    });
}
exports.getDocuments = getDocuments;
