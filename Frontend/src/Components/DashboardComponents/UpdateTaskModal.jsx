import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { io } from "socket.io-client";
import { useTheme } from "../../Context/ThemeContext";
const socket = io(`${import.meta.env.VITE_API_URL}`);

const UpdateTaskModal = ({ updateTaskModal, setUpdateTaskModal }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState(updateTaskModal?.data?.title);
  const [description, setDescription] = useState(
    updateTaskModal?.data?.description
  );
  const [category, setCategory] = useState(updateTaskModal?.data?.category);

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log({ title, description, category });

    fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/${updateTaskModal?.data?._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Task updated:", data);
        setUpdateTaskModal({ open: false, data: {} });

        // Emit socket event to update the task on the DOM
        socket.emit("task-updated", data);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 bg-opacity-50">
      <div
        className={`${
          theme ? "bg-white/10 text-white" : "bg-white text-black"
        }  rounded-lg shadow-lg p-6 w-96`}
      >
        <h2 className="text-lg font-semibold mb-4">Update Task</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md w-full p-2"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md w-full p-2"
            >
              <option value="to-do">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setUpdateTaskModal({ open: false, data: {} })}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
