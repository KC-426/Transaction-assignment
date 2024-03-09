const transactionSchema = require("../models/transaction");
const userSchema = require("../models/user");

const createTransaction = async (req, res) => {
  try {
    const { income, expense, description, userId } = req.body;

    if (!income || !expense) {
      return res
        .status(400)
        .json({ error: "Please fill the required fields !" });
    }

    const transaction = new transactionSchema({
      income,
      expense,
      saving: income - expense,
      description,
      userId,
    });

    const result = await transaction.save();

    res.status(201).json({ message: "Transaction saved successfully", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await userSchema.findById(id);

    if (!findUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const findTransactions = await transactionSchema
      .find({ userId: id })
      .populate("userId");

    if (!findTransactions) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user." });
    }

    return res.status(200).json({
      message: "Transactions retrieved successfully.",
      transactions: findTransactions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getTransactionSummary = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await userSchema.findById(id);
    if (!findUser) {
      return res.status(404).json({ message: "No user found" });
    }

    const findTransactions = await transactionSchema
      .find({ userId: id })
      .populate("userId");

    if (!findTransactions) {
      return res.status(404).json({
        message: "No transactions found for the specified time period.",
      });
    }

    const transactionData = findTransactions.map((transaction) => ({
      income: transaction.income || 0,
      expense: transaction.expense || 0,
      saving: transaction.saving || 0,
    }));

    return res.status(200).json({
      message: "Transaction summary retrieved successfully",
      transactions: transactionData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const findTransaction = await transactionSchema.findById(id);
    if (!findTransaction) {
      return res.status(404).json({ message: "no transaction found" });
    }

    await transactionSchema.findByIdAndRemove(id);
    res.status(200).json({ message: "transaction deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server side error !!" });
  }
};

exports.createTransaction = createTransaction;
exports.getTransaction = getTransaction;
exports.getTransactionSummary = getTransactionSummary;
exports.deleteTransaction = deleteTransaction;
