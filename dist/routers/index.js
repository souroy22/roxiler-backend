"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_routers_1 = __importDefault(require("./transaction.routers"));
const routers = express_1.default.Router();
routers.use("/transaction", transaction_routers_1.default);
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
exports.default = routers;
//# sourceMappingURL=index.js.map