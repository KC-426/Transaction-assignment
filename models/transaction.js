const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    income: {
      type: Number,
      required: true
    },
    expense: {
      type: Number,
      required: true
    },
    saving: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
