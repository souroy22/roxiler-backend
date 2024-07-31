"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controllers_1 = __importDefault(require("../controllers/transaction.controllers"));
const pagination_1 = require("../utils/pagination");
const checkMissingParams_1 = __importDefault(require("../middlewares/checkMissingParams"));
const transactionRouters = express_1.default.Router();
transactionRouters.get("/all", pagination_1.paginateMiddleware, transaction_controllers_1.default.getAllTransaction);
transactionRouters.get("/statistics", checkMissingParams_1.default.checkMonthParam, transaction_controllers_1.default.getStatistics);
transactionRouters.get("/bar-chart-data", checkMissingParams_1.default.checkMonthParam, transaction_controllers_1.default.getBarChartData);
transactionRouters.get("/categorywise-count", checkMissingParams_1.default.checkMonthParam, transaction_controllers_1.default.getUniqueCategoriesCount);
transactionRouters.get("/combined-data", checkMissingParams_1.default.checkMonthParam, transaction_controllers_1.default.getCombinedData);
exports.default = transactionRouters;
//# sourceMappingURL=transaction.routers.js.map