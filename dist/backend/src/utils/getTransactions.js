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
exports.getTransactions = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const getTransactions = (month_1, ...args_1) => __awaiter(void 0, [month_1, ...args_1], void 0, function* (month, project = null, lookup = null, unwind = "") {
    const aggregateArray = [];
    if (lookup) {
        aggregateArray.push({
            $lookup: lookup,
        });
    }
    if (unwind.trim()) {
        aggregateArray.push({
            $unwind: unwind,
        });
    }
    if (project) {
        aggregateArray.push({
            $project: project,
        });
    }
    aggregateArray.push({
        $match: {
            month: month,
        },
    });
    const transactions = yield transaction_model_1.default.aggregate(aggregateArray);
    return transactions;
});
exports.getTransactions = getTransactions;
//# sourceMappingURL=getTransactions.js.map