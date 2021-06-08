import express, { Application, Request, request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import posts from "./routes/posts";
import user from "./routes/user";

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_DB_CON_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use("/api/posts", posts);
app.use("/api/user", user);

mongoose.connection.once("open", () => {
  console.log("Connected");
  app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
});

const PORT = process.env.PORT || 9000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});
