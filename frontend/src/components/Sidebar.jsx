import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { LuSearch } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { IoMdLogOut } from "react-icons/io";
import { serverUrl } from "../main";
import {
  setOtherUsers,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { userData, otherUsers, selectedUser } = useSelector(
    (state) => state.user,
  );
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(setUserData(null));
        dispatch(setOtherUsers(null));
        navigate("/login");
      } else {
        console.error("Logout failed on the server");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`lg:w-[30%] lg:block  ${!selectedUser ? "block" : "hidden"} w-full h-[100vh] bg-slate-200`}
    >
      {/* Logout */}
      <div
        className="w-[50px] h-[50px]  rounded-full flex justify-center items-center bg-[#20c7ff] text-gray-700  overflow-hidden shadow-gray-500 shadow-lg mt-[10px] cursor-pointer fixed bottom-[20px] left-[20px] "
        onClick={() => {
          handleLogout();
        }}
      >
        <IoMdLogOut className="w-[20px] h-[20px] cursor-pointer" />
      </div>
      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] lg shadow-gray-400 shadow-lg flex flex-col  justify-center p-[20px] ">
        <div>
          <h1 className="text-white font-bold text-[25px]">GufGaf</h1>
          <div className="w-full flex justify-between items-center">
            <h1 className="text-gray-800 font-bold text-[25px]">
              Hii, {userData?.user?.name || "User"}
            </h1>
            <div
              className="w-[60px] h-[60px]  rounded-full flex justify-center items-center  overflow-hidden shadow-gray-500 shadow-lg cursor-pointer bg-white"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <img
                src={userData.user?.image || dp}
                alt="profile"
                className="h-[100%] "
              />
            </div>
          </div>

          <div className="flex items-center gap-[20px] mt-[10px]">
            {!search && (
              <div
                className="w-[50px] h-[50px]  rounded-full flex justify-center items-center bg-white  overflow-hidden shadow-gray-500 shadow-lg mt-[10px]"
                onClick={() => setSearch(true)}
              >
                <LuSearch className="w-[20px] h-[20px] cursor-pointer" />
              </div>
            )}

            {search && (
              <form className="w-full h-[50px] bg-white  overflow-hidden shadow-gray-500 shadow-lg flex justify-center items-center px-[20px] gap-[10px] mt-[10px] rounded-full">
                <LuSearch className="w-[25px] h-[25px] cursor-pointer" />
                <input
                  className="w-full h-full outline-none text-[17px]"
                  type="text"
                  placeholder="Search user..."
                />
                <RxCross2
                  className="w-[25px] h-[25px] cursor-pointer"
                  onClick={() => setSearch(false)}
                />
              </form>
            )}

            {!search &&
              otherUsers?.map((user) => (
                <div key={user._id} className="    ">
                  <div className="w-[50px] h-[50px]  rounded-full flex justify-center items-center  overflow-hidden shadow-gray-500 shadow-lg bg-white">
                    <img
                      src={user?.image || dp}
                      alt="profile"
                      className="h-[100%] "
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[60vh] overflow-auto flex flex-col gap-[20px] mt-[20px] px-[5px]">
        {otherUsers?.map((user) => (
          <div
            key={user._id}
            className="w-[95%]  flex items-center  shadow-gray-500 shadow-lg bg-white rounded-full gap-[10px] cursor-pointer hover:bg-[#20c7ff] "
            onClick={() => {
              dispatch(setSelectedUser(user));
            }}
          >
            <div className="w-[50px] h-[50px]  rounded-full flex justify-center items-center  overflow-hidden shadow-gray-500 shadow-lg bg-white">
              <img
                src={user?.image || dp}
                alt="profile"
                className="h-[100%] "
              />
            </div>
            <h1 className="text-gray-800 font-semibold text-[18px]">
              {user?.name || user?.userName}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
