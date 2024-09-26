require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected successfully");
      app.listen(port, () => {
        console.log("Listening on port " + port);
      });
    },
    (error) => {
      console.log("Database could not be connected: " + error);
    }
  );

// Routes
const adminUserRoutes = require("./routes/admin.route");
const adminProductsRoutes = require("./routes/admin-products.route");
const userRoutes = require("./routes/user.route");
const dashboardRoutes = require("./routes/dashboard.route");
const authRoute = require("./routes/auth.route");
const refreshTokenRoute = require("./routes/refresh-token.route");

//
app.use(
  cors({
    origin: "http://localhost:8100",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminUserRoutes);
app.use("/admin", adminProductsRoutes);
app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoute);
app.use("/refresh-token", refreshTokenRoute);
