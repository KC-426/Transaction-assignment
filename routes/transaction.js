const express = require("express");
const transactionController = require("../controllers/transaction");
const userAuth = require('../middleware/auth')

const router = express.Router();

router.post("/create_transaction", transactionController.createTransaction);
router.get("/get_transaction/:id", userAuth, transactionController.getTransaction);
router.get("/get_trans_summary/:id", userAuth, transactionController.getTransactionSummary)
router.delete('/delete_transaction/:id', transactionController.deleteTransaction)

module.exports = router;
