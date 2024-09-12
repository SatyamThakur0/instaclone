import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const { user } = useSelector((store) => store.user);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const Socket = io("http://localhost:8000", {
            transports: ["websocket"],
            query: {
                userId: user?._id,
            },
        });
        setSocket(Socket);
    }, []);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
