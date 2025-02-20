import React from "react";

export default function TaskCard({ task, setActiveCard, index }) {
  return (
    <div
      draggable
      onDragStart={() => setActiveCard([index, task])}
      onDragEnd={() => setActiveCard(null)}
      className="bg-white p-4 active:opacity-75 active:border-2 active:border-black rounded-lg shadow-md mb-4"
    >
      <h3 className="font-semibold text-lg">{task?.title}</h3>
      <p className="text-sm text-gray-600">{task?.description}</p>
      <p className="text-sm text-gray-600">{task?.category}</p>
      {/* <p className="text-xs text-gray-400">{task.date}</p> */}
    </div>
  );
}
