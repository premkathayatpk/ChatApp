import React, { useState } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { LuSearch } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const Sidebar = () => {
  const { userData } = useSelector((state) => state.user);
  const [search, setSeacrh] = useState(false);
  return (
    <div className="lg:w-[30%] w-full h-[100vh] bg-slate-200">
      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] lg shadow-gray-400 shadow-lg flex flex-col  justify-center p-[20px] ">
        <div>
          <h1 className="text-white font-bold text-[25px]">GufGaf</h1>
          <div className="w-full flex justify-between items-center">
            <h1 className="text-gray-800 font-bold text-[25px]">
              Hii, {userData?.user?.name}
            </h1>
            <div className="w-[60px] h-[60px]  rounded-full flex justify-center items-center  overflow-hidden shadow-gray-500 shadow-lg">
              <img
                src={userData.user?.image || dp}
                alt="profile"
                className="h-[100%] "
              />
            </div>
          </div>
          {!search && (
            <div
              className="w-[60px] h-[60px]  rounded-full flex justify-center items-center bg-white  overflow-hidden shadow-gray-500 shadow-lg mt-[10px]"
              onClick={() => setSeacrh(true)}
            >
              <LuSearch className="w-[25px] h-[25px] cursor-pointer" />
            </div>
          )}

          {search && (
            <form className="w-full h-[60px] bg-white  overflow-hidden shadow-gray-500 shadow-lg flex justify-center items-center px-[20px] gap-[10px] mt-[10px] rounded-full">
              <LuSearch className="w-[25px] h-[25px] cursor-pointer" />
              <input
                className="w-full h-full outline-none text-[17px]"
                type="text"
                placeholder="Seacrh user..."
              />
              <RxCross2
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => setSeacrh(false)}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
