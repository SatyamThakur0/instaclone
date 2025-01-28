import { postsActions } from "@/store/postsSlice";
import { userActions } from "@/store/userSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Logout = () => {
    const dispatch = useDispatch();
    try {
        const res = fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "include",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(userActions.setNull());
                    dispatch(postsActions.setNull());
                    toast.success(data.message);
                    navigate("/login");
                    localStorage.removeItem("user");
                    localStorage.removeItem("profile");
                    localStorage.removeItem("token");
                }
            });
    } catch (error) {
        console.log(error);
    }
};

export default Logout;
