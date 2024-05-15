// const { Permission } =require("../models/permissionModel");
// const AppError =require("../utils/AppError");
// const { selectModel } =require("../utils/selectModel");

// const unauthorized = (next) => {
//   return next(new AppError("You are not authorized to perform this action"));
// };

//  const authorization = async (req, res, next) => {
//   const method = req.method; //req.method
//   const table = selectModel(req.params.table, next)?.collection?.collectionName; //model.collection.collectionName
//   const role = req.user.role; //req.user.role
//   const data =
//     role === "private-customer" || "business-customer" || role === "lawyer"
//       ? undefined
//       : await Permission.findById(req.user.permission); //permission data
//   let key = table === "users" ? req.query.uu_tt : table;
//   let methods = [];

//   //translate permission data to request method
//   data &&
//     data?.roles[key]?.map((val) => {
//       switch (val) {
//         case "read":
//           methods.push(val.replace("read", "GET"));
//           break;
//         case "update":
//           methods.push(val.replace("update", "PUT"));
//           break;
//         case "create":
//           methods.push(val.replace("create", "POST"));
//           break;
//         case "delete":
//           methods.push(val.replace("delete", "DELETE"));
//           break;
//       }
//     });

//   const step1 = data && Object.keys(data?.roles).includes(key);
//   const step2 = methods && methods?.includes(method) ? true : false;

//   if (role === "super-admin") {
//     //super admin can perform any kind of actions
//     next();
//   } else {
//     if (method === "GET") {
//       //every user has a permission to read all data
//       next();
//     } else {
//       //we just switch the table type to select which table can be used
//       switch (table) {
//         case "categories":
//           //current user role
//           switch (role) {
//             case "private-customer":
//               return unauthorized(next);
//             case "business-customer":
//               return unauthorized(next);
//             case "lawyer":
//               return unauthorized(next);
//             default:
//               if (step1 && step2) {
//                 return next();
//               } else {
//                 return unauthorized(next);
//               }
//           }

//         case "cases":
//           //current user role
//           switch (role) {
//             case "private-customer":
//               return unauthorized(next);
//             case "business-customer":
//               return unauthorized(next);
//             case "lawyer":
//               return unauthorized(next);
//             default:
//               if (step1 && step2) {
//                 return next();
//               } else {
//                 return unauthorized(next);
//               }
//           }

//         case "permissions":
//           switch (role) {
//             case "private-customer":
//               return unauthorized(next);
//             case "business-customer":
//               return unauthorized(next);
//             case "lawyer":
//               return unauthorized(next);
//             case "representative":
//               if (method === "GET") {
//                 return next();
//               } else {
//                 return unauthorized(next);
//               }
//           }

//         case "users": //users table has every users data in this system.
//           //to identify which users will be affected by this action in users table
//           switch (
//             req.query.uu_tt //uu_tt is user type it can be lawyer, customer or representative and this will be available only if the table type is users
//           ) {
//             case "lawyers":
//               switch (role) {
//                 case "lawyer":
//                   return next();
//                 case "representative":
//                   if (step1 && step2) {
//                     return next();
//                   } else {
//                     return unauthorized(next);
//                   }
//                 default:
//                   return unauthorized(next);
//               }

//             case "customers":
//               switch (role) {
//                 case "customer":
//                   return next();
//                 case "representative":
//                   if (step1 && step2) {
//                     return next();
//                   } else {
//                     return unauthorized(next);
//                   }
//                 default:
//                   return unauthorized(next);
//               }
//           }

//         case "case-managers":
//           switch (role) {
//             case "case-manager":
//               return next();
//             default:
//               return unauthorized(next);
//           }

//         case "applications":
//           return next();
//         case "payments":
//           return next();
//         case "chats":
//           return next();
//         default:
//           return unauthorized();
//       }
//     }
//   }
// };

// module.exports = { authorization };
