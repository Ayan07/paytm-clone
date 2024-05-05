const express = require("express");
const { Account } = require("../db");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middlewares");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  return res.json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  //find the sender account
  const senderAccount = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!senderAccount || senderAccount.balance < amount) {
    await session.abortTransaction();
    return res.json({
      message: "Insufficient balance or account does not exist",
    });
  }

  const receiverAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!receiverAccount) {
    await session.abortTransaction();
    return res.json({
      mesage: "Receiver account does not exist",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

accountRouter.use((req, res, next, err) => {
  console.log(err);
  res.json({
    message: "Internal server error in accounts route",
  });
});

module.exports = accountRouter;
