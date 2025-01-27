import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { CgClapperBoard } from "react-icons/cg";
import { FaRegCompass, FaRegHeart } from "react-icons/fa";
import { FiHome, FiSearch } from "react-icons/fi";
import { RiAddBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import CreatePostDialog from "./CreatePostDialog";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/userSlice";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { notificationAction } from "@/store/notificationSlice";

const BottomSidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [tab, setTab] = useState("home");
    const { user } = useSelector((store) => store.user);

    const SidebarItems = [
        {
            icon: <FiHome className="scale-150" />,
            name: "home",
        },
        {
            icon: <FiSearch className="scale-150" />,
            name: "search",
        },
        {
            icon: <RiAddBoxLine className="scale-150" />,
            name: "create",
        },
        {
            icon: (
                <div>
                    <FaRegHeart className="scale-150" />
                </div>
            ),
            name: "notifications",
        },
        {
            icon: <IoChatbubbleEllipsesOutline className="scale-150" />,
            name: "chat2",
        },
        {
            icon: (
                <Avatar className="w-7 h-7">
                    <AvatarImage />
                    <AvatarFallback>ST</AvatarFallback>
                </Avatar>
            ),
            name: "profile",
        },
    ];
    function handleTabChange(name) {
        setTab(name);
        if (name === "create") {
            setOpen(true);
        } else if (name === "profile") {
            dispatch(userActions.setProfile(null));
            dispatch(userActions.setProfilePost([]));
            dispatch(userActions.setProfile(user));
            localStorage.setItem("profile", JSON.stringify(user));
            navigate(`/profile/${user?._id}`);
        } else if (name === "home") {
            navigate("/home");
        } else if (name === "chat2") {
            navigate("/chat2");
        } else if (name === "notifications") {
            getNotifications();
            setOpenNotiPanel(true);
            dispatch(notificationAction.setNewNotificationEmpty());
        }
    }
    return (
        <>
            <div
                className={`z-50 bg-white sm:hidden flex w-[100%] h-16 fixed bottom-0 justify-around items-center border-t border-gray-600`}
            >
                {SidebarItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => handleTabChange(item.name)}
                        className={`${
                            tab == item.name && "bg-gray-100"
                        } p-4 rounded-md hover:bg-gray-100 cursor-pointer`}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>
            <CreatePostDialog open={open} setOpen={setOpen} />
        </>
    );
};

export default BottomSidebar;
