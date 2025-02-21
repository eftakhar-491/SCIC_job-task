import React from "react";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";
import { useTheme } from "../../Context/ThemeContext";

const TaskColumn = ({
  title,
  tasks,
  color,
  setActiveCard,
  onDrop,
  category,
  setAddOpenModal,
}) => {
  const { theme } = useTheme();
  return (
    <div className="w-1/3 p-4 min-w-[280px]">
      <h2 className={`font-bold mb-4 ${color}`}>{title}</h2>
      {category === "to-do" && (
        <button
          onClick={setAddOpenModal}
          className={`w-full  mb-4 p-3 rounded-lg  ${
            theme ? "bg-white/10 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          ➕ Add New
        </button>
      )}
      <DropArea onDrop={() => onDrop(category, 0)} />
      {tasks.map((task, index) => (
        <div key={index}>
          <TaskCard index={index} task={task} setActiveCard={setActiveCard} />
          <DropArea onDrop={() => onDrop(category, index + 1)} />
        </div>
      ))}
    </div>
  );
};

export default TaskColumn;
