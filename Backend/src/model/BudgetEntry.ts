import mongoose from "mongoose";

const budgetEntrySchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        price: {
        type: Number,
        required: true,
        },
        user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        date : {
            type : String,
            required : true
        }
    },
    { timestamps: true }
    );

export const BudgetEntry = mongoose.model("BudgetEntry", budgetEntrySchema);