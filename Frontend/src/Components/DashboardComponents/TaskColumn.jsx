import React from "react";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({
  title,
  tasks,
  color,
  setActiveCard,
  onDrop,
  category,
}) => {
  // console.log(tasks);
  return (
    <div className="w-1/3 p-4">
      <h2 className={`font-bold mb-4 ${color}`}>{title}</h2>
      {category === "to-do" && (
        <button className="w-full bg-gray-200 mb-4 p-3 rounded-lg text-gray-600 hover:bg-gray-300">
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
