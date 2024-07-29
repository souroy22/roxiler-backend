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
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const pagination_1 = require("../utils/pagination");
const getTransactions_1 = require("../utils/getTransactions");
const getStatistics_1 = require("../utils/getStatistics");
const getBarChartData_1 = require("../utils/getBarChartData");
const getUniqueCategoriesCount_1 = require("../utils/getUniqueCategoriesCount");
const transactionControllers = {
    getAllTransaction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { searchQuery } = req.query;
            const query = {};
            if (searchQuery) {
                query.$or = [
                    { title: { $regex: searchQuery, $options: "i" } },
                    { description: { $regex: searchQuery, $options: "i" } },
                ];
            }
            const dbQuery = transaction_model_1.default.find(query).populate({
                path: "category",
                select: "name -_id",
            });
            const result = yield (0, pagination_1.paginate)(dbQuery, req.pagination);
            return res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
    getStatistics: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const month = parseInt(req.query.month, 10);
            const transactions = yield (0, getTransactions_1.getTransactions)(month, {
                price: 1,
                sold: 1,
                month: { $month: "$dateOfSale" },
            });
            const data = (0, getStatistics_1.getStatistics)(transactions);
            return res.status(200).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
    getBarChartData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const month = parseInt(req.query.month, 10);
            const transactions = yield (0, getTransactions_1.getTransactions)(month, {
                price: 1,
                month: { $month: "$dateOfSale" },
            });
            const distribution = (0, getBarChartData_1.getBarChartData)(transactions);
            return res.status(200).json(distribution);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
    getUniqueCategoriesCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const month = parseInt(req.query.month, 10);
            const transactions = yield (0, getTransactions_1.getTransactions)(month, {
                category: "$categoryDetails.name",
                month: { $month: "$dateOfSale" },
            }, {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails",
            }, "$categoryDetails");
            const data = yield (0, getUniqueCategoriesCount_1.getUniqueCategoriesCount)(transactions);
            return res.status(200).json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
    getCombinedData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const month = parseInt(req.query.month, 10);
            const statisticsTransactions = yield (0, getTransactions_1.getTransactions)(month, {
                price: 1,
                sold: 1,
                month: { $month: "$dateOfSale" },
            });
            console.log("Coming -----", statisticsTransactions);
            const statisticsData = (0, getStatistics_1.getStatistics)(statisticsTransactions);
            const barChartTransactions = yield (0, getTransactions_1.getTransactions)(month, {
                price: 1,
                month: { $month: "$dateOfSale" },
            });
            const barChartData = (0, getBarChartData_1.getBarChartData)(barChartTransactions);
            const uniqueCategoryCountTransactions = yield (0, getTransactions_1.getTransactions)(month, {
                category: "$categoryDetails.name",
                month: { $month: "$dateOfSale" },
            }, {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails",
            }, "$categoryDetails");
            const uniqueCategoryCountData = yield (0, getUniqueCategoriesCount_1.getUniqueCategoriesCount)(uniqueCategoryCountTransactions);
            return res
                .status(200)
                .json({ statisticsData, barChartData, uniqueCategoryCountData });
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error: ${error.message}`);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
    }),
};
exports.default = transactionControllers;
//# sourceMappingURL=transaction.controllers.js.map