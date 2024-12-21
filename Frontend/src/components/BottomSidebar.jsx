import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { CgClapperBoard } from "react-icons/cg";
import { FaRegCompass, FaRegHeart } from "react-icons/fa";
import { FiHome, FiSearch } from "react-icons/fi";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiAddBoxLine } from "react-icons/ri";

const BottomSidebar = () => {
    const SidebarItems = [
        {
            icon: <FiHome className="scale-150" />,
        },
        {
            icon: <FiSearch className="scale-150" />,
        },
        {
            icon: <FaRegCompass className="scale-150" />,
        },
        {
            icon: <CgClapperBoard className="scale-150" />,
        },
        {
            icon: <RiAddBoxLine className="scale-150" />,
        },
        {
            icon: (
                <Avatar className="w-7 h-7">
                    <AvatarImage />
                    <AvatarFallback>ST</AvatarFallback>
                </Avatar>
            ),
        },
    ];
    return (
        <div className={`z-50 bg-white sm:hidden flex w-screen h-16 fixed bottom-0 justify-around items-center border-t border-gray-600`}>
            {SidebarItems.map((item) => (
                <div className={`p-4 rounded-md hover:bg-gray-300 cursor-pointer`}>{item.icon}</div>
            ))}
        </div>
    );
};

export default BottomSidebar;
