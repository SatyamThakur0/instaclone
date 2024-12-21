import React from "react";
import styles from "./Sidebar.module.css";
import { FiHome, FiSearch } from "react-icons/fi";
import { FaRegCompass, FaRegHeart } from "react-icons/fa";
import { CgClapperBoard } from "react-icons/cg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import LeftSidebarItem from "./LeftSidebarItem";
const LeftSidebar = () => {
    const SidebarItems = [
        {
            icon: <FiHome className="scale-150" />,
            itemName: "Home",
        },
        {
            icon: <FiSearch className="scale-150" />,
            itemName: "Search",
        },
        {
            icon: <FaRegCompass className="scale-150" />,
            itemName: "Explore",
        },
        {
            icon: <CgClapperBoard className="scale-150" />,
            itemName: "Reels",
        },
        {
            icon: <IoChatbubbleEllipsesOutline className="scale-150" />,
            itemName: "Messages",
        },
        {
            icon: (
                <div>
                    <FaRegHeart className="scale-150" />
                </div>
            ),
            itemName: "Notifications",
        },
        {
            icon: <RiAddBoxLine className="scale-150" />,
            itemName: "Create",
        },
        {
            icon: (
                <Avatar className="w-7 h-7">
                    <AvatarImage />
                    <AvatarFallback>ST</AvatarFallback>
                </Avatar>
            ),
            itemName: "Profile",
        },
    ];
    return (
        <div
            className={`z-50 bg-white hidden sm:block border-2 border-green-600 md:px-2 overscroll-none fixed left-0 ${styles.sidebar} h-screen`}
        >
            <div className={`mt-4 px-4 font-bold mb-8`}>LOGO</div>
            <div className={`  flex w-full items-center justify-center `}>
                <div
                    className={`flex flex-col justify-center gap-2 items-start `}
                >
                    {SidebarItems.map((item) => (
                        <LeftSidebarItem key={item.itemName} item={item} />
                    ))}
                </div>
            </div>
            <div
                className={`${styles.floatbottom} flex gap-2 items-center rounded-md cursor-pointer hover:bg-slate-100 px-6 py-3`}
            >
                <Link className="flex gap-2 items-center justify-center">
                    <BiLogOut className="scale-150" />
                    <span className="hidden md:block">Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default LeftSidebar;
