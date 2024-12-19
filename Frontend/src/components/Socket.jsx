import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Socket = () => {
    const { user } = useSelector((store) => store.user);
    const [socket, setSocket] = useState();
    const Socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
        transports: ["websocket"],
        query: {
            userId: user?._id,
        },
    });
    setSocket(Socket);
    return socket;
};

export default Socket;
