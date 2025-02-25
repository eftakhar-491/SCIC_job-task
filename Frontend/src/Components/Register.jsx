import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState, useContext } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { AuthContext } from "../Firebase/AuthProvider";
import { useTheme } from "../Context/ThemeContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const { createUser, signInWithGoogle } = useContext(AuthContext);

  const togglePasswordView = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUser(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithGoogle();
    } catch (error) {}
  };

  return (
    <section className={theme ? "bg-black" : "bg-white"}>
      <div
        className={`w-full h-screen flex items-center justify-center ${
          theme ? "text-white" : "text-black"
        }`}
      >
        <div
          className={`w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 ${
            theme ? "bg-gray-900" : "bg-gray-200"
          } flex-col flex items-center gap-3 rounded-xl shadow-lg`}
        >
          <img src={logo} alt="logo" className="w-12 md:w-14" />
          <h1 className="text-lg md:text-xl font-semibold">
            Create an Account
          </h1>
          <p className="text-xs md:text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-500">Login</span>
            </Link>
          </p>

          <button onClick={toggleTheme} className="absolute top-5 right-5">
            {theme ? (
              <FaSun className="text-yellow-500" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>

          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleRegister}
          >
            <div
              className={`w-full flex items-center gap-2 ${
                theme ? "bg-gray-800" : "bg-gray-300"
              } p-2 rounded-xl`}
            >
              <IoMdPerson />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`bg-transparent border-0 w-full outline-none text-sm md:text-base ${
                  theme ? "text-white" : "text-black"
                }`}
              />
            </div>

            <div
              className={`w-full flex items-center gap-2 ${
                theme ? "bg-gray-800" : "bg-gray-300"
              } p-2 rounded-xl`}
            >
              <MdAlternateEmail />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-transparent border-0 w-full outline-none text-sm md:text-base ${
                  theme ? "text-white" : "text-black"
                }`}
              />
            </div>

            <div
              className={`w-full flex items-center gap-2 ${
                theme ? "bg-gray-800" : "bg-gray-300"
              } p-2 rounded-xl relative`}
            >
              <FaFingerprint />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-transparent border-0 w-full outline-none text-sm md:text-base ${
                  theme ? "text-white" : "text-black"
                }`}
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordView}
                />
              ) : (
                <FaRegEye
                  className="absolute right-5 cursor-pointer"
                  onClick={togglePasswordView}
                />
              )}
            </div>

            <button
              type="submit"
              className={`w-full p-2 rounded-xl mt-3 ${
                theme
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-sm md:text-base`}
            >
              Register
            </button>
          </form>

          <div className="relative w-full flex items-center justify-center py-3">
            <div className="w-2/5 h-[2px] bg-gray-800"></div>
            <h3
              className={`font-lora text-xs md:text-sm px-4 ${
                theme ? "text-gray-500" : "text-gray-700"
              }`}
            >
              Or
            </h3>
            <div className="w-2/5 h-[2px] bg-gray-800"></div>
          </div>

          <div
            onClick={handleGoogleSignup}
            className={`p-1 md:px-6 lg:px-10 ${
              theme ? "bg-slate-700" : "bg-slate-300"
            } cursor-pointer w-full rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2`}
          >
            <img
              src="/google-icon.png"
              alt="google-icon"
              className="w-6 md:w-8"
            />{" "}
            Google Login
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
