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
exports.getUniqueCategoriesCount = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const getUniqueCategoriesCount = (transactions) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {};
    const categories = yield category_model_1.default.find();
    for (let category of categories) {
        data[category.name] = 0;
    }
    for (let transaction of transactions) {
        if (data.hasOwnProperty(transaction.category)) {
            data[transaction.category] += 1;
        }
        else {
            data[transaction.category] = 1;
        }
    }
    return data;
});
exports.getUniqueCategoriesCount = getUniqueCategoriesCount;
//# sourceMappingURL=getUniqueCategoriesCount.js.map