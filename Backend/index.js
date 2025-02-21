require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://task-manager-scic-curd.web.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

// MongoDB Connection
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
let db, tasksCollection;

async function connectDB() {
  const client = new MongoClient(DB_URL);
  await client.connect();
  db = client.db(DB_NAME);
  tasksCollection = db.collection("tasks");
}

connectDB().catch(console.error);

// CRUD APIs
app.get("/api/tasks", async (req, res) => {
  const email = req.query.email;

  try {
    const tasks = await tasksCollection
      .find({ email })
      .sort({ position: 1 })
      .toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const len = await tasksCollection
      .find({ category: req.body.category })
      .toArray();
    const result = await tasksCollection.insertOne({
      position: len.length,
      ...req.body,
    });
    const newTask = { _id: result.insertedId, ...req.body };

    // Ensure the event is emitted after the task is added
    io.emit("tasks-updated");

    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Update the positions of tasks in the same category to avoid duplicates

    const { category, position, fromCategory, fromPosition } = req.body;

    await tasksCollection.updateMany(
      { category: fromCategory, position: { $gt: fromPosition } },
      { $inc: { position: -1 } }
    );

    // Step 2: Increment positions in the target category
    await tasksCollection.updateMany(
      { category, position: { $gte: position } },
      { $inc: { position: 1 } }
    );

    // Step 3: Update the dragged task's category and position

    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { position, category } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    io.emit("tasks-updated");
    res.json({ ...req.body, _id: id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await tasksCollection.findOne({
      _id: new ObjectId(id),
    });

    io.emit("task-updated");
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.delete("/api/tasks/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const position = parseInt(req.query.position);
    const category = parseInt(req.query.category);

    // Step 1: Delete the task
    const deleteResult = await tasksCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Step 2: Decrement positions of tasks in the same category
    await tasksCollection.updateMany(
      { category: category, position: { $gt: position } },
      { $inc: { position: -1 } }
    );

    io.emit("tasks-updated");
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Socket.io Connection
io.on("connection", (socket) => {});

const PORT = 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
