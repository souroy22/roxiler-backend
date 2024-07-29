import express from "express";
import transactionControllers from "../controllers/transaction.controllers";
import { paginateMiddleware } from "../utils/pagination";
import checkMissingParams from "../middlewares/checkMissingParams";

const transactionRouters = express.Router();

transactionRouters.get(
  "/all",
  paginateMiddleware,
  transactionControllers.getAllTransaction
);

transactionRouters.get(
  "/statistics",
  checkMissingParams.checkMonthParam,
  transactionControllers.getStatistics
);

transactionRouters.get(
  "/bar-chart-data",
  checkMissingParams.checkMonthParam,
  transactionControllers.getBarChartData
);

transactionRouters.get(
  "/categorywise-count",
  checkMissingParams.checkMonthParam,
  transactionControllers.getUniqueCategoriesCount
);

transactionRouters.get(
  "/combined-data",
  checkMissingParams.checkMonthParam,
  transactionControllers.getCombinedData
);

export default transactionRouters;
