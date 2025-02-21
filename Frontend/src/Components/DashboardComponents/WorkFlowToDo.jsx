import React, { useContext, useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";

import { io } from "socket.io-client";
import AddTaskModal from "./AddTaskModal";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useTheme } from "../../Context/ThemeContext";

export default function WorkFlowToDo() {
  const { user } = useContext(AuthContext);
  const [activeCard, setActiveCard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openAddModal, setAddOpenModal] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);

    const fetchTasks = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks?email=${user?.email}`
      );
      const data = await res.json();
      console.log(data);
      setTasks(data);
    };

    fetchTasks();
    socket.on("tasks-updated", fetchTasks);
    socket.on("task-updated", fetchTasks);

    return () => socket.disconnect();
  }, []);
  const onDrop = async (category, position) => {
    if (!activeCard) return;
    console.log(activeCard);
    try {
      console.log(activeCard, category, position);
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${activeCard[1]._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            position: parseInt(position),
            fromCategory: activeCard[1]?.category,
            fromPosition: activeCard[1]?.position,
          }),
        }
      );
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
      <div
        className={`${
          theme ? "bg-[#101828]/70" : "bg-gray-100"
        } flex lg:justify-around justify-start flex-wrap p-2 lg:p-6 rounded-b-2xl min-h-[500px]`}
      >
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
