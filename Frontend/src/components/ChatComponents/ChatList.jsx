import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { DotIcon } from "lucide-react";
import { chatAction } from "@/store/chatSlice";

function ChatList() {
    const { suggestedUsers } = useSelector((store) => store.user);
    const { onlineUsers } = useSelector((store) => store.chat);
    const dispatch = useDispatch();

    return (
        <div className="flex-1 overflow-y-auto">
            <header className="md:hidden bg-white p-4 border-b">
                <h1 className="text-xl font-bold">Messages</h1>
            </header>
            <h2 className="text-lg font-semibold p-4">Chats</h2>
            <ul>
                {suggestedUsers.map((user) => (
                    <li
                        key={user._id}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                            dispatch(chatAction.setSelectedChat(user))
                        }
                    >
                        <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage
                                src={user.profilePicture}
                                alt={user.name}
                            />
                            <AvatarFallback>
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-600 truncate">
                                {user.lastMessage}
                            </p>
                        </div>
                        <span
                            className={`${
                                onlineUsers.includes(user._id)
                                    ? "text-green-500"
                                    : "text-red-500"
                            } text-xs text-gray-400 `}
                        >
                            {onlineUsers.includes(user._id)
                                ? "online"
                                : "offline"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;
