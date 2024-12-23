import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { chatAction } from "@/store/chatSlice";
import { useNavigate } from "react-router";

const GetAllMessages = () => {
    const dispatch = useDispatch();
    const { selectedChat } = useSelector((state) => state.chat);
    const token = localStorage.getItem("token");
    const payload = { token };
    const navigate = useNavigate();
    if (!token) navigate("/login");

    useEffect(() => {
        // console.log("req.send");
        try {
            dispatch(chatAction.setLoading(true));
            let res = fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/message/get/${
                    selectedChat._id
                }`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(payload),
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        console.log(res.messages);
                        dispatch(chatAction.setMessages(res.messages));
                        dispatch(chatAction.setLoading(false));
                    } else navigate("/login");
                });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(chatAction.setLoading(false));
        }
    }, [selectedChat]);
};

export default GetAllMessages;
