import React, { useContext, useState } from "react";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";
import logo from "../../assets/logo.png"; // Adjust the path as necessary
import { AuthContext } from "../../Firebase/AuthProvider";
import { useTheme } from "../../Context/ThemeContext";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useContext(AuthContext);
  const { logOut } = useContext(AuthContext);
  return (
    <nav
      className={`
        ${theme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
        rounded-t-2xl
      `}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center ">
          <img src={logo} alt="logo" className="w-12 md:w-14" />
          <div className="flex space-x-4">
            {/* <button
              onClick={async () => await logOut()}
              className="cursor-pointer border px-3 py-1 rounded-xl"
            >
              Logout
            </button> */}
            {/* <a href="#dashboard" className="hover:text-blue-500">
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
            </a> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`bg-transparent border-b pb-2 outline-none text-sm md:text-base ${
                theme ? "text-white" : "text-black"
              } placeholder-gray-500`}
            />
            <div className="absolute right-2 top-1/2 transform pb-2 -translate-y-1/2">
              <FaSearch
                className={`text-gray-500 ${
                  theme ? "text-white" : "text-black"
                }`}
              />
            </div>
          </div> */}
          <button
            onClick={async () => await logOut()}
            className="cursor-pointer border px-3 py-1 rounded-xl"
          >
            Logout
          </button>
          <button onClick={toggleTheme} className="p-2 cursor-pointer">
            {theme ? (
              <FaSun className="text-yellow-500 scale-150" />
            ) : (
              <FaMoon className="text-gray-800 scale-150" />
            )}
          </button>
          <div className="w-8 h-8 border border-gray-300 rounded-full">
            {!user ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <img className="rounded-full" src={user?.photoURL} alt="" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
