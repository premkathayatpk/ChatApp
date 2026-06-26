import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { serverUrl } from "../main";

const getOtherUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (userData) return;

    const fetchUser = async () => {
      try {
        let res = await fetch(`${serverUrl}/api/user/others`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(setOtherUsers(data.data || data));
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchUser();
  }, [userData]);
  return userData;
};

export default getOtherUsers;
