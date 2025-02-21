import React, { useState } from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import { io } from "socket.io-client";
import { useTheme } from "../../Context/ThemeContext";
const socket = io(`${import.meta.env.VITE_API_URL}`);

export default function TaskCard({ task, setActiveCard, index }) {
  const [updateTaskModal, setUpdateTaskModal] = useState({
    open: false,
    data: {},
  });
  function formatDate(isoTimestamp) {
    const date = new Date(isoTimestamp);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }
  const { theme } = useTheme();
  async function handelDelete(DeleteData) {
    console.log(DeleteData);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/delete/${
          DeleteData?._id
        }?position=${DeleteData?.position}&category=${DeleteData?.category}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const data = await response.json();
      console.log("Task deleted:", data);

      // Emit socket event to update the task on the DOM
      socket.emit("tasks-updated");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <>
      {updateTaskModal?.open && (
        <UpdateTaskModal
          updateTaskModal={updateTaskModal}
          setUpdateTaskModal={setUpdateTaskModal}
        />
      )}
      <div
        draggable
        onDragStart={() => setActiveCard([index, task])}
        onDragEnd={() => setActiveCard(null)}
        className={`${
          theme ? "bg-white/10 text-white" : "text-black bg-gray-100"
        } cursor-grab p-4 active:opacity-75 active:border-2 active:border-black rounded-lg shadow-md mb-4`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{task?.title}</h3>
          <p className={`${theme ? "texxt-white/50" : "bg-gray-100"} text-xs`}>
            {formatDate(task?.timestamp)}
          </p>
        </div>
        <p className={`${theme ? "text-gray-200" : "bg-gray-100"} text-sm`}>
          {task?.description}
        </p>
        <div className="flex justify-between items-center gap-3 mt-3">
          <button
            onClick={() => setUpdateTaskModal({ open: true, data: task })}
            className="cursor-pointer bg-blue-400 w-1/2 text-center font-semibold rounded-2xl"
          >
            Edit
          </button>
          <button
            onClick={() => handelDelete(task)}
            className="cursor-pointer bg-red-400 w-1/2 text-center font-semibold rounded-2xl"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
