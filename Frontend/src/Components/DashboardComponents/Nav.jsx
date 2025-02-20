import React, { useState } from "react";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.png"; // Adjust the path as necessary

export default function Nav() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <nav
      className={`
        ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
        rounded-t-2xl
      `}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center ">
          <img src={logo} alt="logo" className="w-12 md:w-14" />
          <div className="flex space-x-4">
            <a href="#dashboard" className="hover:text-blue-500">
              Dashboard
            </a>
            <a href="#tasks" className="hover:text-blue-500">
              Tasks
            </a>
            <a href="#projects" className="hover:text-blue-500">
              Projects
            </a>
            <a href="#workflow" className="hover:text-blue-500">
              Workflow
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`bg-transparent border-b pb-2 outline-none text-sm md:text-base ${
                isDarkTheme ? "text-white" : "text-black"
              } placeholder-gray-500`}
            />
            <div className="absolute right-2 top-1/2 transform pb-2 -translate-y-1/2">
              <FaSearch
                className={`text-gray-500 ${
                  isDarkTheme ? "text-white" : "text-black"
                }`}
              />
            </div>
          </div>
          <button onClick={toggleTheme} className="p-2">
            {isDarkTheme ? (
              <FaSun className="text-yellow-500 scale-150" />
            ) : (
              <FaMoon className="text-gray-800 scale-150" />
            )}
          </button>
          <div className="w-8 h-8 border border-gray-300 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
}
