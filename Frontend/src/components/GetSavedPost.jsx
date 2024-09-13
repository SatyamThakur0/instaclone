import { userActions } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetSavedPosts = ({ userId }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(
            `https://instaclone-backend-nu.vercel.app/api/user/profile/saved/${userId}`,
            {
                credentials: "include",
            }
        )
            .then((res) => res.json())
            .then((res) => {
                dispatch(userActions.setProfileSavedPosts(res.savedPosts));
            });
    }, [userId]);
};
export default GetSavedPosts;
