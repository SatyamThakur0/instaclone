import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { FiHome } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import GetSuggestedUsers from "./GetSuggestedUsers";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/userSlice";
import { notificationAction } from "@/store/notificationSlice";
import NotificationDialog from "./NotificationDialog";
import CreatePostDialog from "./CreatePostDialog";
import { toast } from "sonner";
import { postsActions } from "@/store/postsSlice";

const LeftSidebar = () => {
    const [openNotiPanel, setOpenNotiPanel] = useState(false);
    const { user } = useSelector((store) => store.user);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tab, setTab] = useState("home");
    GetSuggestedUsers();

    const SidebarItems = [
        {
            icon: <FiHome className="scale-150" />,
            itemName: "home",
        },
        // {
        //     icon: <FiSearch className="scale-150" />,
        //     itemName: "Search",
        // },
        // {
        //     icon: <FaRegCompass className="scale-150" />,
        //     itemName: "Explore",
        // },
        // {
        //     icon: <CgClapperBoard className="scale-150" />,
        //     itemName: "Reels",
        // },
        {
            icon: <IoChatbubbleEllipsesOutline className="scale-150" />,
            itemName: "chat",
        },
        {
            icon: (
                <div>
                    <FaRegHeart className="scale-150" />
                </div>
            ),
            itemName: "notifications",
        },
        {
            icon: <RiAddBoxLine className="scale-[1.7]" />,
            itemName: "create",
        },
        {
            icon: (
                <img
                    className="w-7 h-7 rounded-[20%]"
                    src={user.profilePicture}
                    alt=""
                />
            ),
            itemName: "profile",
        },
    ];
    const getNotifications = async () => {
        const token = localStorage.getItem("token");
        const payload = { token };
        let res = await fetch(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/api/notification/allnotificactions`,
            {
                method: "POST",
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(payload),
            }
        );
        res = await res.json();
        console.log(res);
        dispatch(notificationAction.setNotifications(res.Notifications));
    };

    function handleTabChange(name) {
        setTab(name);
        console.log(name);

        if (name === "create") {
            setOpen(true);
        } else if (name === "profile") {
            dispatch(userActions.setProfile(null));
            dispatch(userActions.setProfilePost([]));
            dispatch(userActions.setProfile(user));
            localStorage.setItem("profile", JSON.stringify(user));
            navigate(`/profile/${user?._id}`);
        } else if (name === "home") {
            navigate("/");
        } else if (name === "chat") {
            navigate("/chat");
        } else if (name === "notifications") {
            getNotifications();
            setOpenNotiPanel(true);
            dispatch(notificationAction.setNewNotificationEmpty());
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (data.success) {
                dispatch(userActions.setNull());
                dispatch(postsActions.setNull());
                toast.success(data.message);
                navigate("/login");
                localStorage.removeItem("user");
                localStorage.removeItem("profile");
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <NotificationDialog
                openNotiPanel={openNotiPanel}
                setOpenNotiPanel={setOpenNotiPanel}
            />
            <CreatePostDialog open={open} setOpen={setOpen} />
            <div
                className={`fixed z-50 bg-white hidden sm:block border-r border-gray-400 md:px-2 overscroll-none  left-0 ${styles.sidebar} h-screen lg:w-[160px] sm:w-[75px]`}
            >
                <div className={`mt-4 px-3 font-bold mb-8`}>LOGO</div>
                <div className={`flex w-full items-center justify-center `}>
                    <div
                        className={`flex flex-col justify-center gap-2 items-start `}
                    >
                        {SidebarItems.map((item) => (
                            <div
                                key={item.itemName}
                                className={`flex py-2 px-3 w-full h-[50px] items-center hover:bg-gray-300 transition-colors cursor-pointer rounded-md lg:justify-start justify-center gap-3 bordner-2 border-green-700`}
                                onClick={() => handleTabChange(item.itemName)}
                            >
                                <div className="">{item.icon}</div>
                                <span className="sm:hidden lg:block bordner-2 border-red-900">
                                    {item.itemName}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className={`${styles.floatbottom} flex gap-2 items-center rounded-md cursor-pointer hover:bg-slate-100 px-6 py-3`}
                >
                    <div
                        onClick={handleLogout}
                        className="flex gap-2 items-center justify-center"
                    >
                        <BiLogOut className="scale-150" />
                        <span className="hidden lg:block">Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeftSidebar;
