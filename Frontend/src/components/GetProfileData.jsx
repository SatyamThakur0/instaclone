import { userActions } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const GetProfileData = ({ userId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(`https://instaclonetanxapi.vercel.app/api/post/posts/${userId}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((res) => {
                dispatch(userActions.setProfilePost(res.userPosts));
            });
    }, [userId]);
};
