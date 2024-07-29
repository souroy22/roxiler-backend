import express from "express";
import transactionRouters from "./transaction.routers";

const routers = express.Router();

routers.use("/transaction", transactionRouters);

// routers.get("/add", async (_: Request, res: Response) => {
//   try {
//     const result = await axios.get(
//       "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
//     );
//     const uniqueCategories = Array.from(
//       new Set(result.data.map((product: ITransaction) => product.category))
//     );
//     console.log("uniqueCategories", uniqueCategories);
//     await Category.insertMany(
//       uniqueCategories.map((cat) => {
//         return { name: cat };
//       })
//     );
//     const categories = await Category.find();
//     const transactions = result.data.map((transaction: any) => {
//       delete transaction["id"];
//       const cat = categories.find(
//         (category) => category.name === transaction.category
//       );
//       if (!cat) {
//         return res.status(404).json({ error: "No category found!" });
//       }
//       transaction["category"] = cat._id;
//       return transaction;
//     });
//     console.log("transactions", transactions);
//     await Transaction.insertMany(transactions);
//     return res.status(200).json({ msg: "Data added successfully!" });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`Error: ${error.message}`);
//       return res.status(500).json({ error: "Something went wrong!" });
//     }
//   }
// });

export default routers;
