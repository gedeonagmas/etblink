import asyncCatch from "express-async-catch";
import AppError from "../utils/AppError.js";
import { selectModel } from "../utils/selectModel.js";
import v2 from "./../config/cloudinary.js";
import { Query } from "mongoose";
const api = "http://localhost:3001/uploads/";
const encrypt = (query) => {
  return btoa(query);
};

const decrypt = (query) => {
  return atob(query);
};

const fileHandler = (value, req) => {
  if (req.files) {
    if (req.files.galleries) {
      value.galleries = req.files.galleries?.map((e) => api + e.filename);
    }
    if (req.files.logo) {
      value.logo = api + req.files.logo[0].filename;
    }
    if (req.files.banner) {
      value.banner = api + req.files.banner[0].filename;
    }
    if (req.files.video) {
      value.video = api + req.files.video[0].filename;
    }
    if (req.files.newsPhoto) {
      value.newsPhoto = api + req.files.newsPhoto[0].filename;
    }
  }
  return value;
};

//create
export const _create = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);
  const value = { ...req.body };
  const files = fileHandler(value, req);
  if (model) {
    if (req.files?.attachments === undefined) {
      const data = await model.create({
        ...files,
        // attachments: results?.length > 0 ? results : undefined,
      });

      if (!data)
        return next(
          new AppError("something went wrong unable to create the data")
        );

      return res.status(201).json({
        status: "Success",
        message: "data created successfully",
        data,
      });
    } else {
      let results = [];
      req.files?.attachments?.map(async (file, i) => {
        console.log(file, "files");
        results.push(file[0].path);

        if (results.length === req.files.attachments.length) {
          const data = await model.create({
            ...req.body,
            attachments: results,
          });

          if (!data)
            return next(
              new AppError("something went wrong unable to create the data")
            );

          return res.status(201).json({
            status: "Success",
            message: "data created successfully",
            data,
          });
        }
      });
    }
  }
});

//read
export const _read = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);
  if (model) {
    // const total = await model.find({ _id: req.params.id });
    const total = await model.countDocuments();
    const params = { ...req.query };

    //removing unnecessary queries for filtering
    const remove = [
      "sort",
      "page",
      "limit",
      "fields",
      "limits",
      "searchField",
      "searchValue",
      "populatingType",
      "populatingValue",
    ];
    remove.forEach((el) => delete params[el]);

    //filtering
    let queryObject = JSON.parse(
      JSON.stringify(params).replace(
        /\b(gte|lte|lt|gt|eq|neq)\b/g,
        (match) => `$${match}`
      )
    );

    //searching
    if (req.query.searchField)
      queryObject[req.query.searchField] = new RegExp(
        req.query.searchValue,
        "gi"
      );
    // queryObject[req.query.searchField] = new RegExp('(>[^<.]*)(' + req.query.searchValue + ')([^<.]*)','gi');

    //sorting
    const query = model.find({ ...queryObject });
    req.query.sort
      ? query.sort(req.query.sort.split(",").join(" "))
      : query.sort("createdAt");

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
    switch (req.query.populatingType) {
      case "users":
        query.populate(req.query.populatingValue);
        break;
      case "application":
        query.populate(req.query.pp_ff.split(",").join(" "));
      default:
        query;
    }

    req.query.limits ? query.limit(req.query.limits) : null;
    const data = await query;

    //last page indicator
    if (page) {
      const doc = await model.countDocuments();
      if (skip >= doc)
        return res.status(200).json({ message: "you are in the last page" });
    }
    if (data.length < 1)
      return next(new AppError("There is no data to display", 400));

    return res.status(200).json({
      status: "success",
      length: data.length,
      total: total,
      data: data,
    });
  }
  return next(new AppError("something went wrong please try again!!", 500));
});

//update
export const _update = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);
  console.log(req.body, "body");
  const value = { ...req.body };
  const files = fileHandler(value, req);
  value.socialMedias
    ? (value.socialMedias = JSON.parse(value.socialMedias))
    : null;
  value.workingDays
    ? (value.workingDays = JSON.parse(value.workingDays))
    : null;
  // console.log(req.files, "files", req.file, "file");
  if (model) {
    const data = await model.findOneAndUpdate(
      { _id: req.query.id },
      { ...files },
      { runValidators: true }
    );

    if (!data)
      return next(
        new AppError("something went wrong unable to update the data")
      );

    return res
      .status(201)
      .json({ status: "Success", message: "data updated successfully" });
  }
  return next(new AppError("something went wrong please try again!!", 500));
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

    return res
      .status(201)
      .json({ status: "Success", message: "data deleted successfully" });
  }
  return next(new AppError("something went wrong please try again!!", 500));
});

//read single data
export const _read_single = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);

  const query = model.find({ _id: req.params.id });

  //populating
  switch (req.query.populatingType) {
    case "private":
      query.populate(req.query.pp_ff);
      break;
    case "application":
      query.populate(req.query.pp_ff.split(",").join(" "));
    default:
      query;
  }

  const data = await query;
  // const data = await query.sort("-createdAt").limit(req.query.limits);

  if (!data)
    return next(new AppError("something went wrong unable to fetch the data"));

  return res
    .status(201)
    .json({ status: "Success", message: "data fetched successfully", data });
});
