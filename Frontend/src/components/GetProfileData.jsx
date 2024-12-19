import { userActions } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export const GetProfileData = ({ userId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const payload = { token };
        if (!token) navigate("/login");
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/posts/${userId}`, {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(userActions.setProfilePost(res.userPosts));
            });
    }, [userId]);
};
