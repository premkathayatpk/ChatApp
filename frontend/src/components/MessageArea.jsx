import { FaArrowLeftLong } from "react-icons/fa6";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const MessageArea = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div
      className={`lg:w-[70%] ${selectedUser ? "flex flex-col" : "hidden"} lg:block w-full h-[100vh] bg-slate-200 border-2 border-gray-300 relative`}
    >
      {selectedUser && (
        <div className="w-full h-[100px] bg-[#0489b5] rounded-b-[30px] shadow-gray-400 shadow-lg flex gap-[20px] items-center p-[20px]">
          <div onClick={() => dispatch(setSelectedUser(null))}>
            <FaArrowLeftLong size={20} className="cursor-pointer text-white" />
          </div>
          <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center overflow-hidden shadow-gray-500 shadow-lg cursor-pointer bg-white">
            <img
              src={selectedUser?.image || dp}
              alt="profile"
              className="h-[100%]"
            />
          </div>
          <h1 className="text-white font-semibold text-[18px]">
            {selectedUser?.name || selectedUser?.userName}
          </h1>
        </div>
      )}

      {selectedUser && (
        <div className="flex-1 w-full ">
          {showPicker && (
            <div className="absolute bottom-[110px] left-[20px] z-50">
              <EmojiPicker
                width={250}
                height={350}
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}

          {/* Form Container */}
          <div className="w-full lg:w-[70%] h-[100px] fixed bottom-0 lg:bottom-[20px] flex items-center justify-center p-4">
            <form
              className="w-full lg:w-[70%] h-[60px] bg-[#0489b5] rounded-full shadow-gray-500 shadow-lg flex items-center gap-[20px] px-[20px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div onClick={() => setShowPicker((prev) => !prev)}>
                <RiEmojiStickerLine className="w-[25px] h-[25px] text-white cursor-pointer" />
              </div>

              <input
                type="text"
                placeholder="Message..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="w-full h-full px-[10px] outline-none border-0 text-white text-[19px] bg-transparent placeholder-white"
              />
              <FaImages className="w-[25px] h-[25px] text-white cursor-pointer" />
              <IoSend className="w-[25px] h-[25px] text-white cursor-pointer" />
            </form>
          </div>
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-bold text-[50px]">
            Welcome to GufGaf
          </h1>
          <span className="text-gray-700 font-semibold text-[30px] text-blue-500">
            Chat With Friends!
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
