import asyncCatch from "express-async-catch";
import AppError from "../utils/AppError.js";
import { selectModel } from "../utils/selectModel.js";

//create
export const _create = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);

  if (model) {
    const data = await model.create(req.body);

    if (!data)
      return next(
        new AppError("something went wrong unable to create the data")
      );

    res
      .status(201)
      .json({ status: "Success", message: "data created successfully", data });
  }
});

//read
export const _read = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);
  if (model) {
    const total = await model.find({ _id: req.params.id });
    const params = { ...req.query };

    const remove = [
      "sort",
      "page",
      "limit",
      "fields",
      "value",
      "ss_ff",
      "ss_vv",
      "pp_tt",
      "pp_ff",
    ];
    remove.forEach((el) => delete params[el]);

    //filtering
    let queryObject = JSON.parse(
      JSON.stringify(params).replace(
        /\b(gte|lte|lt|gt|eq|neq)\b/g,
        (match) => `$${match}`
      )
    );
    // queryObject.deleted = false;
    //searching
    if (req.query.ss_ff)
      queryObject[req.query.ss_ff] = new RegExp(req.query.ss_vv, "gi");
    // queryObject[req.query.ss_ff] = new RegExp('(>[^<.]*)(' + req.query.ss_vv + ')([^<.]*)','gi');

    //sorting
    const query = model.find({ ...queryObject });
    req.query.sort
      ? query.sort(req.query.sort.split(",").join(" "))
      : query.sort("-createdAt");

    //limiting fields
    const fields = req.query.fields
      ? req.query.fields.split(",").join(" ")
      : "-_v";
    query.select(fields);

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || null;
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);

    //populating
    switch (req.query.pp_tt) {
      case "private":
        query.populate(req.query.pp_ff);
        break;
      case "application":
        query.populate(req.query.pp_ff.split(",").join(" "));
      default:
        query;
    }

    const data = await query;

    //last page indicator
    if (page) {
      const dd = await model.countDocuments();
      if (skip >= dd)
        return next(new AppError("you are in the last page", 404));
    }
    if (data.length < 1)
      return next(new AppError("There is no data to display", 400));

    return res.status(200).json({
      status: "success",
      length: data.length,
      total: total.length,
      data: data,
    });
  }
});

//update
export const _update = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);

  if (model) {
    const data = await model.findOneAndUpdate(
      { _id: req.query.id },
      { ...req.body },
      { runValidators: true }
    );

    if (!data)
      return next(
        new AppError("something went wrong unable to update the data")
      );

    res
      .status(201)
      .json({ status: "Success", message: "data updated successfully" });
  }
});

//delete
export const _delete = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);

  if (model) {
    const data = await model.findByIdAndUpdate(
      { _id: req.query.id },
      { deleted: req.body.type === "delete" ? true : false }
    );

    if (!data)
      return next(
        new AppError("something went wrong unable to delete the data")
      );

    res
      .status(201)
      .json({ status: "Success", message: "data deleted successfully" });
  }
});

//read single data
export const _read_single = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);
  const query = model.findById(req.params.id);
  //populating
  switch (req.query.pp_tt) {
    case "private":
      query.populate(req.query.pp_ff);
      break;
    case "application":
      query.populate(req.query.pp_ff.split(",").join(" "));
    default:
      query;
  }

  const data = await query;
  if (!data)
    return next(new AppError("something went wrong unable to fetch the data"));

  res
    .status(201)
    .json({ status: "Success", message: "data fetched successfully", data });
});
