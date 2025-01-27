"use client";

import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import LeftSidebar from "../LeftSidebar";
import BottomSidebar from "../BottomSidebar";
import { useDispatch, useSelector } from "react-redux";
import { chatAction } from "@/store/chatSlice";

function Chat() {
    const {selectedChat} = useSelector((store) => store.chat);
    const dispatch = useDispatch();

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <LeftSidebar />
                {!selectedChat && <BottomSidebar />}
                {/* Sidebar for larger screens */}
                <div className="flex-1 flex sm:ml-[75px] lg:ml-[160px]">
                    <aside className="hidden md:flex md:flex-col lg:w-80 md:w-72 bg-white border-r">
                        <UserList />
                        <ChatList />
                    </aside>

                    {/* Main content area */}
                    <main className="flex-1 flex flex-col">
                        {selectedChat ? (
                            <ChatWindow
                                chat={selectedChat}
                                onBack={() =>
                                    dispatch(chatAction.setSelectedChat(null))
                                }
                            />
                        ) : (
                            <div className="md:hidden flex-1 overflow-y-auto">
                                <ChatList />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Chat;
