const express = require("express");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

const signupSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signInSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

const updateUserSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  passWord: zod.string().optional(),
});

userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Email already taken / incorrct inputs",
    });
  }

  const user = await User.findOne({
    userName: body.userName,
  });

  if (user && user._id) {
    return res.status(411).json({
      message: "Email already taken ? incoorect inputs",
    });
  }

  const dbUser = await User.create(body);
  const userId = dbUser._id;

  //create an account for the user
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created succesfully",
    token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signInSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Invalid inputs",
    });
  }

  const user = await User.findOne({
    userName: body.userName,
    password: body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    return res.json({
      message: "Signed in succesfully",
      token,
    });
  }

  return res.json({
    message: "Error logging in",
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateUserSchema.safeParse(body);
  if (!success) {
    return res.json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, body);

  return res.json({
    message: "Updated succesfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  return res.json({
    users: users.map((user) => ({
      userName: user.usserName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

userRouter.use((req, res, next, err) => {
  console.log(err);
  res.json({
    message: "Internal server error in accounts route",
  });
});

module.exports = userRouter;
