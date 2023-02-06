import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import values from "./values.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/values", values);
app.use("*", (req, res) => {
  return res.status(404).json({ error: "not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
