import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRef, useState } from "react";
import styles from "./Post.module.css";
import { chatAction } from "@/store/chatSlice";
import Messages from "./Messages";
import { useNavigate } from "react-router";
import GetSuggestedUsers from "./GetSuggestedUsers";

const ChatPage2 = () => {
    GetSuggestedUsers();
    const { selectedChat, messages, onlineUsers } = useSelector(
        (state) => state.chat
    );
    const [chatSelected, setChatSelected] = useState(null);
    const { user, suggestedUsers } = useSelector((store) => store.user);
    const inpMessage = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState("");

    const inputHandler = (e) => {
        if (!e.target.value.trim()) {
            setText("");
        } else setText(e.target.value);
    };

    const setSelectedChat = async (e, receiver) => {
        e.preventDefault();
        dispatch(chatAction.setMessages([]));
        try {
            setChatSelected(receiver);
            dispatch(chatAction.setSelectedChat(receiver));
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        try {
            const msg = inpMessage.current.value;
            const token = localStorage.getItem("token");
            const payload = { token, message: msg };

            if (!token) navigate("/login");
            setText("");
            inpMessage.current.value = "";
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
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bor der-2 flex border-red-700 w-[84vw] relative left-[230px]">
            <section className="border-r h-screen border-gray-400  flex flex-col  p-2 w-[250px]">
                <div className="p-2 font-bold mt-10">{user?.username}</div>
                <div className={`${styles.noScrollbar} overflow-scroll`}>
                    {suggestedUsers.map((suggestedUser) => (
                        <div
                            key={suggestedUser._id}
                            onClick={(e) => setSelectedChat(e, suggestedUser)}
                            className={`${
                                chatSelected == suggestedUser && "bg-slate-300"
                            } flex items-center bocrder-2 border-green-700 gap-3 cursor-pointer hover:bg-slate-200 p-2 rounded-lg`}
                        >
                            <Avatar>
                                <AvatarImage
                                    src={suggestedUser?.profilePicture}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center">
                                <span className="font-semibold text-sm">
                                    {suggestedUser?.name}
                                </span>
                                <span
                                    className={`${
                                        onlineUsers?.includes(suggestedUser._id)
                                            ? "text-green-600"
                                            : "text-red-600"
                                    } text-xs font-semibold`}
                                >
                                    {onlineUsers?.includes(suggestedUser._id)
                                        ? "online"
                                        : "offline"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {chatSelected ? (
                <div className="flex-1">
                    <div className="flex border-b border-gray-400 p-4">
                        <div className="flex gap-3">
                            <Avatar>
                                <AvatarImage
                                    src={selectedChat?.profilePicture}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center">
                                <span className="font-bold">
                                    {selectedChat?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Messages chatSelected={chatSelected} />
                    <div className="border rounded-xl border-gray-600 flex w-[65vw] absolute mx-4 bottom-4 items-center">
                        <form className="flex" onSubmit={sendMessageHandler}>
                            <input
                                ref={inpMessage}
                                onChange={inputHandler}
                                placeholder="Message..."
                                className={`bjorder rounded-xl border-gray-600 px-2 w-[62vw] h-10 ${styles.commentinput}`}
                                type="text"
                            />
                            {text && (
                                <button
                                    type="submit"
                                    className="text-sm font-bold text-sky-500 cursor-pointer"
                                >
                                    Send
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            ) : (
                <h1 className="flex items-center justify-center font-bold text-lg ml-[30%]">
                    Select a chat to start messaging
                </h1>
            )}
        </div>
    );
};
export default ChatPage2;
