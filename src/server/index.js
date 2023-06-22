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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const insert_initial_data_1 = require("../../handlers/insert-initial-data");
const get_documents_1 = require("../../handlers/get-documents");
const add_to_cart_1 = require("../../handlers/add-to-cart");
const update_item_quantity_1 = require("../../handlers/update-item-quantity");
const delete_cart_item_1 = require("../../handlers/delete-cart-item");
const get_cart_1 = require("../../handlers/get-cart");
const cors_1 = __importDefault(require("cors"));
const mongoUrl = 'mongodb+srv://sanusihassan122:lmXDegosOY6OKghx@cluster0.oyj3h0y.mongodb.net/shop?retryWrites=true&w=majority';
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// password: lmXDegosOY6OKghx
mongoose_1.default.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000
});
const db = mongoose_1.default.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to MongoDB');
    yield (0, insert_initial_data_1.seedProducts)();
}));
// get-products handler
app.get('/get-products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, get_documents_1.getDocuments)();
    res.json(products);
}));
// get cart items handler
app.get('/get-cartitems', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItems = yield (0, get_cart_1.getCardItems)();
    res.json(cartItems);
}));
// add-to-cart handler
app.post('/add-to-cart', (req, res) => {
    const item = req.body;
    (0, add_to_cart_1.addToCart)(item);
});
// update-cart-item-quantity
app.put('/update-cart-item-quantity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId, quantity } = req.body;
    yield (0, update_item_quantity_1.updateCartItemQuantity)(itemId, quantity);
}));
// delete cart item
app.delete('/delete-cart-item/:itemId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.params;
    try {
        // Remove item from cart in database
        yield (0, delete_cart_item_1.deleteCartItem)(itemId);
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Error removing item from cart:', error);
        res.sendStatus(500);
    }
}));
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
