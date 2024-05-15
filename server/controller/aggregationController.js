const asyncCatch = require("express-async-catch");
const AppError = require("../utils/AppError");
const { selectModel } = require("../utils/selectModel");

const aggregate = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);

  switch (req.query.phase) {
    case "first":
      var today = new Date();
      var priorDate = new Date(new Date().setDate(today.getDate() - 30));
      if (model) {
        const data = await model.aggregate([
          { $unwind: "$updatedAt" },
          {
            $match: {
              updatedAt: {
                $gte: priorDate,
                $lte: today,
              },
            },
          },

          {
            $group: {
              _id: { $dayOfMonth: "$updatedAt" },
              number: { $sum: 1 },
            },
          },

          { $addFields: { date: "2024-02" } },
          { $sort: { _id: 1 } },
        ]);

        if (!data)
          return next(
            new AppError("something went wrong unable to update the data")
          );

        let thisMonthTotal = 0;
        data.map((d) => (thisMonthTotal += d.number));

        const total = await model.countDocuments({});
        return res.status(201).json({
          status: "Success",
          thisMonthTotal,
          data,
          total,
        });
      }
    case "second":
      const priorYear = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      );
      const currentYear = new Date(
        new Date().setFullYear(new Date().getFullYear())
      );
      const data = await model.aggregate([
        // { $unwind: {$year:'createdAt'} },
        {
          $match: {
            year: {
              $gte: new Date().getFullYear() - 5 * 1,
              $lte: new Date().getFullYear() * 1,
            },
          },
        },

        {
          $group: {
            _id: "$year",
            totalCase: { $sum: 1 },
            pendingCase: { $count: {} },
            activeCase: { $sum: "$Active" },
            closedCase: { $sum: "$Closed" },
          },
        },
        {
          $group: {
            _id: "$_id",
            totalCase: { $push: { totalCase: "$_id.totalCase" } },
            pendingCase: { $count: {} },
            activeCase: { $sum: "$Active" },
            closedCase: { $sum: "$Closed" },
          },
        },

        { $sort: { _id: 1 } },
      ]);

      if (!data)
        return next(
          new AppError("something went wrong unable to update the data")
        );

      //   let thisMonthTotal = 0;
      //   data.map((d) => (thisMonthTotal += d.number));

      const total = await model.countDocuments({});
      return res.status(201).json({
        status: "Success",
        // thisMonthTotal,
        data,
        total,
      });

    default:
      return next(
        new AppError("something went wrong unable to update the data")
      );
  }
});

module.exports = { aggregate };
