import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile2 from "./components/Profile2";
import Sidebar from "./components/Sidebar";
import Posts from "./components/Posts";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatAction } from "./store/chatSlice";
import { useSocket } from "./store/SocketContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LeftSidebar from "./components/LeftSidebar";
import BottomSidebar from "./components/BottomSidebar";
import Home2 from "./components/Home2";
import ChatPage2 from "./components/ChatPage2";
import Chat from "./components/ChatComponents/Chat";
import ProfilePage from "./components/profile/ProfilePage";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: (
    //         <ProtectedRoute>
    //             <Sidebar />
    //         </ProtectedRoute>
    //     ),
    //     children: [
    //         {
    //             path: "/",
    //             element: (
    //                 <ProtectedRoute>
    //                     <Home />
    //                 </ProtectedRoute>
    //             ),
    //         },
    //         // {
    //         //     path: "/profile/:id",
    //         //     element: (
    //         //         <ProtectedRoute>
    //         //             <Profile2 />
    //         //         </ProtectedRoute>
    //         //     ),
    //         // },
    //         {
    //             path: "/posts",
    //             element: (
    //                 <ProtectedRoute>
    //                     <Posts />
    //                 </ProtectedRoute>
    //             ),
    //         },
    //         {
    //             path: "/profile/:id/edit",
    //             element: (
    //                 <ProtectedRoute>
    //                     <EditProfile />
    //                 </ProtectedRoute>
    //             ),
    //         },
    //         {
    //             path: "/chat",
    //             element: (
    //                 <ProtectedRoute>
    //                     <ChatPage />
    //                 </ProtectedRoute>
    //             ),
    //         },
    //     ],
    // },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/", element: <Home2 /> },
    { path: "/chat", element: <Chat /> },
    { path: "/profile/:id/edit", element: <EditProfile /> },
    { path: "/profile/:id", element: <ProfilePage /> },
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
