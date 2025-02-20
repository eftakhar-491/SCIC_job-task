import React, { useState } from "react";

export default function DropArea({ onDrop }) {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      className={`${
        showDrop
          ? "h-8 w-full text-sm rounded-2xl opacity-100 border-gray-300 mb-4 border flex justify-center items-center"
          : "opacity-0"
      }`}
    >
      {/* {showDrop ? "Drop Here" : "Drop Here"} */}
      Drop Here
    </div>
  );
}
