import asyncCatch from "express-async-catch";
import AppError from "../utils/AppError.js";
import { Chat } from "../models/chatModel.js";

//create
export const chatCreate = asyncCatch(async (req, res, next) => {
  let data;

  const { sender, receiver, chatId } = req.body;
  const chat = await Chat.findOne({ chatId: `${sender}.${receiver}` });
  if (chat) {
    data = await Chat.create({ ...req.body, chatId: chat?.chatId });
  } else {
    data = await Chat.create({ ...req.body, chatId: `${receiver}.${sender}` });
  }

  if (!data)
    return next(
      new AppError("something went wrong unable to send the message")
    );

  return res.status(201).json({
    status: "Success",
    message: "data created successfully",
    data,
  });
});

//read
export const chatRead = asyncCatch(async (req, res, next) => {
  const { id } = req.params;
  const { pp_ff, limits } = req.query;
  const total = await Chat.countDocuments();
  const data = await Chat.find({
    $or: [
      { chatId: id },
      {
        chatId: id.split(".")[1] + "." + id.split(".")[0],
      },
    ],
  })
    .populate(pp_ff ? pp_ff.split(",").join(" ") : null)
    .limit(limits ? limits : null);

  if (!data)
    return next(new AppError("something went wrong unable to fetch the data"));

  return res.status(201).json({
    status: "Success",
    message: "data fetched successfully",
    total,
    data,
  });
});

//update
export const chatUpdate = asyncCatch(async (req, res, next) => {
  const data = await Chat.findOneAndUpdate(
    { _id: req.query.id },
    { ...req.body },
    { runValidators: true }
  );

  if (!data)
    return next(new AppError("something went wrong unable to update the data"));

  return res
    .status(201)
    .json({ status: "Success", message: "data updated successfully" });
});

//delete
export const chatDelete = asyncCatch(async (req, res, next) => {
  const data = await Chat.findByIdAndUpdate(
    { _id: req.query.id },
    { deleted: req.body.type === "delete" ? true : false }
  );

  if (!data)
    return next(new AppError("something went wrong unable to delete the data"));

  return res
    .status(201)
    .json({ status: "Success", message: "data deleted successfully" });
});
