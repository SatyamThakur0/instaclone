import { useDispatch } from "react-redux";
import { chatAction } from "@/store/chatSlice";
import { useEffect } from "react";
import { useSocket } from "@/store/SocketContext";

const GetRTM = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    
    useEffect(() => {
        // if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            dispatch(chatAction.updateMessages(newMessage));
        });
        return () => {
            socket.off("newMessage");
        };
    }, []);
};
export default GetRTM;
 