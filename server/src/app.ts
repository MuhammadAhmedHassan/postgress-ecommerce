import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import Keygrip from "keygrip";

// Errors
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";
import { Product } from "./entity";

dotenv.config();
const app = express();
// app.set("trust proxy", true);
// const corsConfig = {
//   origin: true,
//   credentials: true,
// };
// app.use(cors(corsConfig));
// app.options("*", cors(corsConfig));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(json());
app.use(
  cookieSession({
    // domain: 'http://localhost:4000/',
    signed: true,
    secure: false,
    // secure: process.env.NODE_ENV !== "test", // secure: true when deploy
    // secure: true, // means 'https', Uncomment it once you deploy you application
    keys: new Keygrip(["key1", "key2"], "SHA384", "base64"),
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: "/",
  })
);

app.use(morgan("dev"));

// DUMMY CODE FOR TESTING PURPOSE
// app.get("/dummy/:subCatUuid/:catId", async (req, res) => {
//   try {
//     const { subCatUuid, catId } = req.params;
//     const category = await Category.findOneOrFail(catId);

//     const subCat = await SubCategory.findOneOrFail({
//       uuid: subCatUuid,
//       category,
//     }).catch(findOneRecordCatch);
//     console.log("subCat", subCat);
//     res.send(subCat);
//   } catch (error) {
//     console.log(error);
//     res.send(error);
//   }
// });

// Routes
fs.readdirSync(path.join(__dirname, "routes")).map((file) =>
  app.use("/api", require("./routes/" + file).router)
);
app.all("*", () => {
  throw new NotFoundError("Route not found");
});
// Error handler middleware
app.use(errorHandler);

export { app };
