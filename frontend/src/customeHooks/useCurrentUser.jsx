import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { data } from "react-router-dom";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (userData) return;

    const fetchUser = async () => {
      try {
        let res = await fetch(`${serverUrl}/api/user/current`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(setUserData(data.data || data));
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchUser();
  }, [dispatch, userData]);
  return userData;
};

export default useCurrentUser;
