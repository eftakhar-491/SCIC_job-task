import React, { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";

import { io } from "socket.io-client";
import AddTaskModal from "./AddTaskModal";

export default function WorkFlowToDo() {
  const [activeCard, setActiveCard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openAddModal, setAddOpenModal] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:5000");

    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      console.log(data);
      setTasks(data);
    };

    fetchTasks();
    socket.on("tasks-updated", fetchTasks);

    return () => socket.disconnect();
  }, []);
  const onDrop = async (category, position) => {
    if (!activeCard) return;
    console.log(activeCard);
    try {
      console.log(activeCard, category, position);
      await fetch(`http://localhost:5000/api/tasks/${activeCard[1]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          position: parseInt(position),
          fromCategory: activeCard[1]?.category,
          fromPosition: activeCard[1]?.position,
        }),
      });
    } catch (err) {
      console.error("Update failed:", err);
    }
    setActiveCard(null);
  };
  const filteredTasks = (status) =>
    tasks
      .filter((task) => task.category === status)
      .sort((a, b) => a.position - b.position);
  return (
    <>
      {openAddModal && <AddTaskModal setAddOpenModal={setAddOpenModal} />}
      <div className="flex justify-around p-6 bg-gray-100">
        <TaskColumn
          setActiveCard={setActiveCard}
          title="🔵 To Start"
          tasks={filteredTasks("to-do")}
          color="text-blue-500"
          category="to-do"
          onDrop={onDrop}
          setAddOpenModal={setAddOpenModal}
        />

        <TaskColumn
          setActiveCard={setActiveCard}
          title="🟡 In Progress"
          tasks={filteredTasks("in-progress")}
          color="text-yellow-500"
          category="in-progress"
          onDrop={onDrop}
        />

        <TaskColumn
          title="🟢 Completed"
          tasks={filteredTasks("done")}
          color="text-green-500"
          category="done"
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </div>
    </>
  );
}
