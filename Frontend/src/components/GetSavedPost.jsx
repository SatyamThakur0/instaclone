import { userActions } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetSavedPosts = ({ userId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const payload = { token };
        if (!token) navigate("/login");
        fetch(
            `https://instaclonetanx.vercel.app/api/user/profile/saved/${userId}`,
            {
                method: "POST",
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(payload),
            }
        )
            .then((res) => res.json())
            .then((res) => {
                dispatch(userActions.setProfileSavedPosts(res.savedPosts));
            });
    }, [userId]);
};
export default GetSavedPosts;
