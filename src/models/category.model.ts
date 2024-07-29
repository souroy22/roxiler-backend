import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const categorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
});

const Category = model<ICategory>("Category", categorySchema);
export default Category;
