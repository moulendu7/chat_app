const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connect_db = require("./config/db-connect.js");
const passport = require("passport");
const passportConfig = require("./auth/passport-jwt_middleware.js");
const routes = require("./routes/index.js");
const socketInstance = require("./socketInstance.js");

const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  }),
);

app.use(passport.initialize());
passportConfig(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
});

require("./socket.js")(io);
socketInstance.init(io);

(async () => {
  await connect_db();
  console.log("MongoDB connected");

  const PORT = process.env.PORT;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
