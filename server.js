require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./config/database");
const app = express();
const cors = require("cors");

// connect to database
connectToDatabase();

// middleware
app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

// server starts listening
// PORT : 8081
app.listen(process.env.PORT, () =>
  console.log(`Server connected at ${process.env.PORT}`)
);
