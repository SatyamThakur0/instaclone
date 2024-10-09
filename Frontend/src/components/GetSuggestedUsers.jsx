import { userActions } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetSuggestedUsers = () => {
    const dispatch = useDispatch();
    try {
        useEffect(() => {
            // const token = localStorage.getItem("token");
            // const payload = { token };
            // if (!token) navigate("/login");
            // fetch("http://localhost:8000/api/user/suggested", {
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
                    "http://localhost:8000/api/user/suggested",
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
