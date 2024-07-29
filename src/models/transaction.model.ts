import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ITransaction extends Document {
  title: string;
  price: number;
  description: string;
  category: ObjectId;
  image: string | null;
  sold: boolean;
  dateOfSale: Date;
}

const transactionSchema: Schema<ITransaction> = new Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, unique: true },
  category: { type: Schema.ObjectId, required: true, ref: "Category" },
  image: { type: String, default: null },
  sold: { type: Boolean, default: false },
  dateOfSale: { type: Date, required: true },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);
export default Transaction;
