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
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
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
  console.log("Connected to MongoDB");
}

connectDB().catch(console.error);

// CRUD APIs
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await tasksCollection.find().sort({ position: 1 }).toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const result = await tasksCollection.insertOne(req.body);
    const newTask = { _id: result.insertedId, ...req.body };
    io.emit("tasks-updated");
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body, id);
    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
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

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

const PORT = 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
