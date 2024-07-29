import Category from "../models/category.model";

export const getUniqueCategoriesCount = async (transactions: any) => {
  const data: any = {};
  const categories = await Category.find();
  for (let category of categories) {
    data[category.name] = 0;
  }
  for (let transaction of transactions) {
    if (data.hasOwnProperty(transaction.category)) {
      data[transaction.category] += 1;
    } else {
      data[transaction.category] = 1;
    }
  }
  return data;
};
