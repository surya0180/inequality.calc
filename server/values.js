import express from "express";
import mongodb from "mongodb";

const router = express.Router();

router.route("/").get(async (req, res) => {
  const client = new mongodb.MongoClient(process.env.MONGOURI);
  let values;
  try {
    await client.connect();
    const db = client.db();
    values = await db.collection("values").find().toArray();
    res.json(values);
  } catch (error) {
    return res.json({ message: "failure" });
  }
  client.close();
});

router.route("/").post(async (req, res) => {
  const client = new mongodb.MongoClient(process.env.MONGOURI);
  const values = {
    id: req.body.id,
    type: req.body.type,
    letter: req.body.letter,
    value: req.body.value,
  };
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("values").insertOne(values);
    res.json({ ...result, msg: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "failure" });
  }
  client.close();
});

export default router;
