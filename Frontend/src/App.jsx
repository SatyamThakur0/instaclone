import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Posts from "./components/Posts";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatAction } from "./store/chatSlice";
import { useSocket } from "./store/SocketContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Sidebar />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/profile/:id", element: <Profile /> },
            { path: "/posts", element: <Posts /> },
            { path: "/profile/:id/edit", element: <EditProfile /> },
            { path: "/chat", element: <ChatPage /> },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
]);

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);
    const { messages } = useSelector((store) => store.chat);

    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        socket.on("getOnlineUsers", (onlineUsers) => {
            dispatch(chatAction.setOnlineUsers(onlineUsers));
        });
    }, [user, dispatch, socket]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
