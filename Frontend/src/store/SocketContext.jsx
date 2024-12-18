import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const { user } = useSelector((store) => store.user);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        // const Socket = io("https://instaclonetanx.vercel.app", {
        const Socket = io("https://instaclone-pe0r.onrender.com", {
            transports: ["websocket"],
            query: {
                userId: user?._id,
            },
            methods: ["GET", "POST"],
            allowedHeaders: ["Authorization"],
            credentials: true,
        });
        setSocket(Socket);
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
