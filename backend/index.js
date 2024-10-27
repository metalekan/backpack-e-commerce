// packages
import path from "path";
import express from "express";
import dotenv from "dotenv/config.js";
import cookieParser from "cookie-parser";

// utiles
import connectDB from "./config/db.js";
import notFoundMiddleware from "./middleware/not-found.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFoundMiddleware);
// const __dirname = path.resolve();
// console.log(__dirname);
// app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// middleware

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}✔️ ✔️ ✔️`);
});
