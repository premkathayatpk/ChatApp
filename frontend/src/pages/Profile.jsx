import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { IoCameraOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState(userData.name || userData.user.name || "");
  const [frontendImg, setFrontendImg] = useState(
    userData.image || userData.user.image || dp,
  );
  const [backendImg, setBackendImg] = useState(null);
  const image = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImg(file);
    setFrontendImg(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      if (backendImg) {
        formData.append("image", backendImg);
      }

      const res = await fetch(`${serverUrl}/api/user/profile`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        dispatch(setUserData(data.user || data.data || data));
      } else {
        alert(`Update failed: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]">
      <div className="fixed top-[20px] left-[20px] text-gray-600 ">
        <FaArrowLeftLong
          size={25}
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div
        className="rounded-full border-4 border-[#20c7ff] shadow-gray-400 shadow-lg bg-white relative cursor-pointer"
        onClick={() => image.current.click()}
      >
        <div className="w-[200px] h-[200px]  rounded-full flex justify-center items-center  overflow-hidden">
          <img src={frontendImg} alt="profile" className="h-[100%] " />
        </div>
        <div className="absolute bottom-2 right-5 p-1 bg-[#20c7ff] rounded-full shadow-gray-400 shadow-lg">
          <IoCameraOutline className=" text-gray-700 w-[28px] h-[28px] " />
        </div>
      </div>

      <form
        onSubmit={handleProfile}
        className="w-[95%] s max-w-[500px] flex flex-col gap-[20px] items-center justify-center"
      >
        <input
          type="file"
          accept="image/*"
          ref={image}
          onChange={handleImage}
          hidden
        />
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg "
        />
        <input
          type="text"
          value={userData?.user?.userName || userData?.userName}
          readOnly
          className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-400 "
        />
        <input
          type="email"
          value={userData?.user?.email || userData?.email || ""}
          readOnly
          className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-400 "
        />
        <button
          className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg mt-[20px] text-[20px] w-[200px] font-semibold hover:shadow-inner cursor-pointer"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
