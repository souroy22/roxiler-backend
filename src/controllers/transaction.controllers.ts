import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import { aggregatePaginate, paginate } from "../utils/pagination";
import { getTransactions } from "../utils/getTransactions";
import { getStatistics } from "../utils/getStatistics";
import { getBarChartData } from "../utils/getBarChartData";
import { getUniqueCategoriesCount } from "../utils/getUniqueCategoriesCount";

const transactionControllers = {
  getAllTransaction: async (req: Request, res: Response) => {
    try {
      const { searchQuery, month } = req.query;
      const query = [];

      query.push({
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      });

      query.push({
        $unwind: "$category",
      });

      query.push({
        $project: {
          title: 1,
          description: 1,
          category: "$category.name",
          month: { $month: "$dateOfSale" },
          dateOfSale: 1,
          image: 1,
          sold: 1,
        },
      });

      if (searchQuery) {
        query.push({
          $match: {
            $or: [
              { title: { $regex: searchQuery, $options: "i" } },
              { description: { $regex: searchQuery, $options: "i" } },
            ],
          },
        });
      }

      if (month) {
        const monthNumber = parseInt(month as string, 10);
        query.push({
          $match: {
            month: monthNumber,
          },
        });
      }

      const result = await aggregatePaginate(
        Transaction,
        query,
        req.pagination
      );
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
  getStatistics: async (req: Request, res: Response) => {
    try {
      const month = parseInt(req.query.month as string, 10);
      const transactions = await getTransactions(month, {
        price: 1,
        sold: 1,
        month: { $month: "$dateOfSale" },
      });
      const data = getStatistics(transactions);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
  getBarChartData: async (req: Request, res: Response) => {
    try {
      const month = parseInt(req.query.month as string, 10);
      const transactions = await getTransactions(month, {
        price: 1,
        month: { $month: "$dateOfSale" },
      });
      const distribution = getBarChartData(transactions);
      return res.status(200).json(distribution);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
  getUniqueCategoriesCount: async (req: Request, res: Response) => {
    try {
      const month = parseInt(req.query.month as string, 10);
      const transactions = await getTransactions(
        month,
        {
          category: "$categoryDetails.name",
          month: { $month: "$dateOfSale" },
        },
        {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
        "$categoryDetails"
      );
      const data = await getUniqueCategoriesCount(transactions);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
  getCombinedData: async (req: Request, res: Response) => {
    try {
      const month = parseInt(req.query.month as string, 10);
      const statisticsTransactions = await getTransactions(month, {
        price: 1,
        sold: 1,
        month: { $month: "$dateOfSale" },
      });
      console.log("Coming -----", statisticsTransactions);
      const statisticsData = getStatistics(statisticsTransactions);
      const barChartTransactions = await getTransactions(month, {
        price: 1,
        month: { $month: "$dateOfSale" },
      });
      const barChartData = getBarChartData(barChartTransactions);

      const uniqueCategoryCountTransactions = await getTransactions(
        month,
        {
          category: "$categoryDetails.name",
          month: { $month: "$dateOfSale" },
        },
        {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
        "$categoryDetails"
      );
      const uniqueCategoryCountData = await getUniqueCategoriesCount(
        uniqueCategoryCountTransactions
      );
      return res
        .status(200)
        .json({ statisticsData, barChartData, uniqueCategoryCountData });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ error: "Something went wrong!" });
      }
    }
  },
};

export default transactionControllers;
