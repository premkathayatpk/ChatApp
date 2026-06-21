import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  console.log(userData);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login Successfull");
        dispatch(setUserData(data.data));

        // navigate("/login");
      } else {
        alert(`Login error ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Login error", error);
      alert(`Login error ${error.message}`);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };
  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg  flex flex-col gap-[30px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] lg shadow-gray-400 shadow-lg flex items-center justify-center ">
          <h1 className="text-[30px] text-gray-600 font-bold ">
            Login To <span className="text-white ">ChatApp</span>
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center justify-center gap-[20px]"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="relative w-[90%] h-[50px] border-2 border-[#20c7ff]  bg-white rounded-lg shadow-gray-200 shadow-lg overflow-hidden">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-full outline-none  px-[20px] py-[10px]  "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {password.length > 0 && (
              <span
                className="absolute top-[10px] right-[20px] text-[19px] text-blue-400 font-semibold cursor-pointer select-none"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg mt-[20px] text-[20px] w-[200px] font-semibold hover:shadow-inner cursor-pointer"
          >
            Login
          </button>

          <p
            className="cursor-pointer "
            onClick={() => {
              navigate("/signup");
            }}
          >
            Want to create an Account ?
            <span className="text-blue-600 font-bold  underline">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
