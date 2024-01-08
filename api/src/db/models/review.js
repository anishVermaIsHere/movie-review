import { Schema,model, SchemaTypes } from "mongoose";

const reviewSchema = new Schema(
  {
    movieId: { type: SchemaTypes.Number, required: true },
    review: { type: SchemaTypes.String, required: true },
    user:{type:SchemaTypes.String, required:true}
  },
  { timestamps: true }
);

export const ReviewModel = model("review", reviewSchema);