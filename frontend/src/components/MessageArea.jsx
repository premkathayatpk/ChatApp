import { FaArrowLeftLong } from "react-icons/fa6";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageArea = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div
      className={`lg:w-[70%] ${selectedUser ? "flex" : "hidden"} lg:block w-full h-[100vh] bg-slate-200 border-2 border-gray-300 `}
    >
      {selectedUser && (
        <div className="w-full h-[100px] bg-[#0489b5] rounded-b-[30px] lg shadow-gray-400 shadow-lg flex gap-[20px]  items-center p-[20px] ">
          <div
            className="  "
            onClick={() => {
              dispatch(setSelectedUser(null));
            }}
          >
            <FaArrowLeftLong size={20} className="cursor-pointer text-white" />
          </div>
          <div className="w-[50px] h-[50px]  rounded-full flex justify-center items-center  overflow-hidden shadow-gray-500 shadow-lg cursor-pointer bg-white">
            <img
              src={selectedUser?.image || dp}
              alt="profile"
              className="h-[100%] "
            />
          </div>
          <h1 className="text-white font-semibold text-[18px]">
            {selectedUser?.name || selectedUser?.userName}
          </h1>
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gary700 font-bold text-[50px]">
            Welcome to GufFaf
          </h1>
          <span className="text-gary700 font-semibold text-[30px] text-blue-500">
            Chat With Friends!
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
