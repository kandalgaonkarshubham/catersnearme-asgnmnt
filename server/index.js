import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(json());

app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
