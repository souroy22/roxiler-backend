import Transaction from "../models/transaction.model";

export const getTransactions = async (
  month: number,
  project: any = null,
  lookup: any = null,
  unwind: any = ""
) => {
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
  const transactions = await Transaction.aggregate(aggregateArray);
  return transactions;
};
