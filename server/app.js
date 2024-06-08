const express = require("express");
require("dotenv/config");
const path = require("path");
const cors = require("cors");
const { errorController } = require("./controller/errorController.js");
const { mongodb } = require("./config/db.js");
const { utilityRouter, chatRouter, router } = require("./routes/router.js");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const { backgroundJob } = require("./controller/backgroundJobController.js");
// import apicache =require("apicache";

const app = express();
// let cache = apicache.middleware;
// app.use(cache("5 minutes"));
// const __dirname = path.resolve();

// process.on("uncaughtException", (err) => {
//   console.log("SHUTTING DOWN ");
//   console.log(err.name, err.message);
//   process.exit(1);
// });
// {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
//     // credentials: true,
//   }
app.use(
  cors({
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use("/etblink/app/v1/user", router);
app.use("/etblink/app/v1/chat", chatRouter);
app.use("/etblink/app/v1/utility", utilityRouter);

//################################ background job ###########################
// cron.schedule("1 * * * * *", backgroundJob);
// cron.schedule("0 0 * * *", backgroundJob); this is the exact one
//################################ background job ###########################

app.get("/", (req, res) => {
  res.json("Hello from etb link server");
});

app.all("*", (req, res, next) => {
  res.status(200).json({ message: `${req.originalUrl} is Invalid url` });
  next();
});
app.use(errorController);
const videoUsers = {};

const socketToRoom = {};
mongodb()
  .then(() => {
    // const server = app.listen(process.env.PORT, (err) => {
    //   if (err) console.log(err);
    //   console.log("JMS server connected on port", process.env.PORT);
    // });
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });

    let users = [];
    const addUser = (user, ids) => {
      if (users.length === 0) {
        users.push({ name: user, id: ids });
      } else {
        users.map((el) => {
          if (el.name === user) {
            el.id = ids;
          } else {
            users.push({ name: user, id: ids });
          }

          let duplicate = [];
          let isDuplicate = false;
          users = users.filter((el) => {
            isDuplicate = duplicate.includes(el.name);
            if (!isDuplicate) {
              duplicate.push(el.name);
              return true;
            } else {
              return false;
            }
          });
          return users;
        });
      }

      // console.log(users, "addd");
    };

    const removeUser = (ids) => {
      users = users.filter((el) => el.id !== ids);

      let duplicate = [];
      let isDuplicate = false;
      users = users.filter((el) => {
        isDuplicate = duplicate.includes(el.name);
        if (!isDuplicate) {
          duplicate.push(el.name);
          return true;
        } else {
          return false;
        }
      });
      // console.log(users, "filterdd");
      return users;
    };

    io.on("connection", (socket) => {
      //user connected
      socket.on("connect-user", (user) => {
        if (user !== "") {
          addUser(user, socket.id);
          io.emit(
            "aaa",
            users.map((u) => u.name)
          );
        }
      });

      //user disconnected
      socket.on("disconnect", () => {
        removeUser(socket.id);
        // console.log(users, "online disconnected");
        io.emit(
          "aaa",
          users.map((u) => u.name)
        );
      });

      //send message for rooms
      socket.on("aa", (messages, room) => {
        // console.log(room1, room2, "rooms");
        socket.join(room);
        socket.to(room).emit("bb", messages);
        // socket.join([room1, room2]);
        // socket.to(room1).to(room2).emit("bb", messages);
      });

      //typing indicator on
      socket.on("typing t", (bool, room) => {
        socket.join(room);
        socket.broadcast.to(room).emit("typing true", bool);
      });

      //typing indicator off
      socket.on("typing f", (bool, room) => {
        socket.join(room);
        socket.to(room).emit("typing false", bool);
      });

      //voice call incoming
      socket.on("call-request-send", (chatId, name) => {
        console.log(chatId, name, "is calling");
        socket.join(chatId);
        socket.to(chatId).emit("call-request-received", name, true);
      });

      socket.on("sen aaaa", (val) => {
        io.emit("rec aaaa", val);
      });

      socket.on("sen bbbb", (val) => {
        io.emit("rec bbbb", val);
      });

      socket.on("sen dddd", (val) => {
        io.emit("rec dddd", val);
      });

      socket.on("a1", (val) => {
        io.emit("a2", val);
      });

      socket.on("bb1", (val) => {
        io.emit("bb2", val);
      });

      socket.on("cc1", (val) => {
        io.emit("cc2", val);
      });

      socket.on("ff1", (val) => {
        io.emit("ff2", val);
      });
      //video ##################################################
      // socket.on("send-video", (payload) => {
      //   console.log(payload, "payload");
      //   io.emit("receive-video", payload);
      // });
      //########################################################
      //group call
      socket.on("join room", (roomID) => {
        if (videoUsers[roomID]) {
          const length = videoUsers[roomID].length;
          if (length === 4) {
            socket.emit("room full");
            return;
          }
          videoUsers[roomID].push(socket.id);
        } else {
          videoUsers[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = videoUsers[roomID].filter(
          (id) => id !== socket.id
        );

        socket.emit("all users", usersInThisRoom);
      });

      socket.on("sending signal", (payload) => {
        io.to(payload.userToSignal).emit("user joined", {
          signal: payload.signal,
          callerID: payload.callerID,
        });
      });

      socket.on("returning signal", (payload) => {
        io.to(payload.callerID).emit("receiving returned signal", {
          signal: payload.signal,
          id: socket.id,
        });
      });

      socket.on("disconnect", () => {
        const roomID = socketToRoom[socket.id];
        let room = videoUsers[roomID];
        if (room) {
          room = room.filter((id) => id !== socket.id);
          videoUsers[roomID] = room;
        }
        socket.broadcast.emit("user left", socket.id);
      });
      //group call end
      //#######################################################
      //private call started
      socket.emit("me", socket.id);

      socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
      });

      socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", {
          signal: data.signalData,
          from: data.from,
          name: data.name,
        });
      });

      socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
      });
    });

    httpServer.listen(3001, (err) => {
      if (err) {
        console.log("something went wrong server not connected");
      }
      console.log("server connected on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// process.on("unhandledRejection", (err) => {
//   console.log("SHUTTING DOWN");
//   console.log(err.message, err.name);
//   server.close(() => {
//     process.exit(1);
//   });
// })

// ##################################################
// const http = require("http");
// const express = require('express');
// const hostname = "etblink.com";
// const port = 3000;

// const app = express();
// const server = http.createServer(app);

// app.get("/", (req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello from ETBLINK NEW \n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

//############################ this is working app.js file from c-panel #####################
// const http = require("http");
// const hostname = "etblink.com";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello from ETBLINK \n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
