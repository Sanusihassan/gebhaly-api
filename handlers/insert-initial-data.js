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
exports.seedProducts = exports.productSchema = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.productSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const ProductModel = mongoose_1.default.model("Products", exports.productSchema);
function seedProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataPath = path_1.default.join(__dirname, "../", "data.json");
        const initialData = JSON.parse(fs_1.default.readFileSync(dataPath, "utf8"));
        const count = yield ProductModel.countDocuments();
        if (count == 0) {
            try {
                const result = yield ProductModel.insertMany(initialData);
                console.log(`Inserted ${result.length} documents into the "Products" collection`);
            }
            catch (error) {
                console.error("Error inserting documents:", error);
            }
        }
    });
}
exports.seedProducts = seedProducts;
