require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./config/database");
const app = express();

// connect to database
connectToDatabase();

// middleware
app.use(express.json({ extended: false }));

// routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));

// server starts listening
// PORT : 8081
app.listen(process.env.PORT, () =>
  console.log(`Server connected at ${process.env.PORT}`)
);
