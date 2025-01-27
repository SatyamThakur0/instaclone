import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotificationDialog = ({ openNotiPanel, setOpenNotiPanel }) => {
    const { notifications } = useSelector((store) => store.notification);
    return (
        <Dialog open={openNotiPanel}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogTitle />
            <DialogContent
                className={`outline-none overflow-y-scroll flex flex-col h-[80vh] max-h-[80vh]`}
                onInteractOutside={() => setOpenNotiPanel(false)}
            >
                <h1 className="text-center font-bold text-2xl">
                    Notifications
                </h1>
                {notifications?.map((notification) => (
                    <div
                        key={notification._id}
                        className="flex gap-3 items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <span className={`flex items-center gap-2 `}>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        className="h-10 w-10"
                                        src={
                                            notification.reactedBy
                                                .profilePicture
                                        }
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Link className={`font-semibold`}>
                                    {notification.reactedBy.username}
                                </Link>
                            </span>
                            <p>
                                {notification.type == "like" ? "lliked" : ""}{" "}
                                your post.
                            </p>
                        </div>
                        {/* <div className="h-[20px] w-[30px] object-cover"> */}
                        <img
                            className=" h-10"
                            src={notification.post?.image}
                            alt=""
                        />
                        {/* </div> */}
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default NotificationDialog;
