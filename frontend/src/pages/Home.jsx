import React from "react";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";

const Home = () => {
  return (
    <div className="w-full h-full flex overflow-hidden ">
      <Sidebar />
      <MessageArea />
    </div>
  );
};

export default Home;
