import { userActions } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const GetSuggestedUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    try {
        useEffect(() => {
            // const token = localStorage.getItem("token");
            // const payload = { token };
            // if (!token) navigate("/login");
            // fetch("${import.meta.env.VITE_BACKEND_URL}/api/user/suggested", {
            //     method: "POST",
            //     credentials: "include",
            //     headers: { "content-type": "application/json" },
            //     body: JSON.stringify(payload),
            // })
            //     .then((res) => res.json())
            //     .then((res) => {
            //         if (res.success) {
            //             dispatch(
            //                 userActions.setSuggestedUsers(res.suggestedUsers)
            //             );
            //         }
            //     });

            async function suggestedUsers() {
                const token = localStorage.getItem("token");
                const payload = { token };
                if (!token) navigate("/login");
                let res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/user/suggested`,
                    {
                        method: "POST",
                        credentials: "include",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                );
                res = await res.json();
                if (res.success) {
                    dispatch(userActions.setSuggestedUsers(res.suggestedUsers));
                }
            }
            suggestedUsers();
        }, []);
    } catch (error) {
        console.log(error);
    }
};

export default GetSuggestedUsers;
