import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { chatAction } from "@/store/chatSlice";
import GetAllMessages from "../custom/GetAllMessages";
import GetRTM from "../custom/GetRTM";

function ChatWindow({ chat }) {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { messages, selectedChat } = useSelector((store) => store.chat);
    const { user } = useSelector((store) => store.user);
    const messageBoxRef = useRef(null);

    GetAllMessages();
    GetRTM();

    const handleSend = async () => {
        try {
            if (message.trim()) {
                const token = localStorage.getItem("token");
                if (!token) navigate("/login");
                const payload = { token, message: message };
                let res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/message/send/${
                        selectedChat._id
                    }`,
                    {
                        credentials: "include",
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(payload),
                    }
                );
                res = await res.json();
                dispatch(chatAction.updateMessages(res.newMessage));
                console.log("Sending message:", message);
                setMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        messageBoxRef.current.scrollTop = messageBoxRef.current?.scrollHeight;
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center p-4 bg-white border-b">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(chatAction.setSelectedChat(null))}
                    className="md:hidden mr-2"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={chat.profilePicture} alt={chat.name} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">{chat.name}</h2>
            </header>

            <div
                ref={messageBoxRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
            >
                {messages?.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex ${
                            msg.sender == user._id
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                                msg.sender == user._id
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            <p>{msg.message}</p>
                            <span className="text-xs opacity-75 mt-1 block">
                                {new Date(msg.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-white border-t">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex space-x-2"
                >
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ChatWindow;
