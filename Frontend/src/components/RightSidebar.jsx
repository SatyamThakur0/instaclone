import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userActions } from "@/store/userSlice";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const RightSidebar = () => {
    const { user, suggestedUsers } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const payload = { token };
    if (!token) navigate("/login");

    const handleFollow = async (userId) => {
        try {
            let res = await fetch(
                `https://instaclonetanxapi.vercel.app/api/user/followorunfollow/${userId}`,
                {
                    credentials: "include",
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            res = await res.json();
            console.log(res);
            
            if (res.success) {
                toast.success(res.message);
                dispatch(
                    userActions.setFollowing({ type: res.type, id: userId })
                );
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`ml-[15%] w-[300px] h-screen borader-2 border-red-700`}>
            <span className={`flex w-full items-center gap-3 mt-5 px-4`}>
                <Avatar
                    onClick={() => navigate(`/profile/${user?._id}`)}
                    className="scale-[1.2] cursor-pointer"
                >
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                    <Link
                        to={`/profile/${user?._id}`}
                        className={`font-semibold m-0`}
                    >
                        {user?.username}
                    </Link>
                    <p className={`text-gray-600 m-0`}>{user?.name}</p>
                </div>
            </span>

            <div className="flex px-3 justify-between mt-5 w-[300px]">
                <p className="font-semibold ml-2 text-sm text-gray-600">
                    Suggested for you
                </p>
                <Link className="font-semibold text-sm mr-[10px]">
                    See all
                </Link>
            </div>
            <div className="mt-1 w-[300px]">
                {suggestedUsers?.length == 0 ? (
                    <>
                        <div className="flex ml-5 items-center gap-3">
                            <Skeleton className="my-[10px] bg-slate-300 w-[110px] h-[50px] rounded-full" />
                            <div>
                                <Skeleton className="h-3 my-[10px] bg-slate-300 w-[100px]" />
                                <Skeleton className="h-3 my-[10px] bg-slate-300 w-[100px]" />
                            </div>
                            <div className="w-[250px]">
                                <Skeleton className="h-3 my-[10px] bg-slate-300 w-[90px] float-end" />
                            </div>
                        </div>
                        <div className="flex ml-5 items-center gap-3">
                            <Skeleton className="my-[10px] bg-slate-300 w-[110px] h-[50px] rounded-full" />
                            <div>
                                <Skeleton className="h-3 my-[10px] bg-slate-300 w-[100px]" />
                                <Skeleton className="h-3 my-[10px] bg-slate-300 w-[100px]" />
                            </div>
                            <div className="w-[250px]">
                                <Skeleton className="h-3 my-[10px] bg-slate-300 w-[90px] float-end" />
                            </div>
                        </div>
                    </>
                ) : (
                    suggestedUsers &&
                    suggestedUsers?.map((suggestedUser) => {
                        return (
                            <span
                                key={suggestedUser._id}
                                className={`flex w-full items-center mt-2 justify-between px-4`}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        onClick={() => {
                                            dispatch(
                                                userActions.setProfile(null)
                                            );
                                            dispatch(
                                                userActions.setProfilePost([])
                                            );
                                            dispatch(
                                                userActions.setProfile(
                                                    suggestedUser
                                                )
                                            );
                                            localStorage.setItem(
                                                "profile",
                                                JSON.stringify(suggestedUser)
                                            );
                                            navigate(
                                                `/profile/${suggestedUser._id}`
                                            );
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <AvatarImage
                                            src={suggestedUser?.profilePicture}
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex w-100 flex-col gap-0">
                                        <Link className={`font-semibold m-0`}>
                                            {suggestedUser?.username}
                                        </Link>
                                        <p
                                            className={`text-gray-600 text-sm m-0`}
                                        >
                                            {suggestedUser?.name}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    onClick={() =>
                                        handleFollow(suggestedUser._id)
                                    }
                                    className="text-sm font-semibold text-blue-500 cursor-pointer mr-[6px]"
                                >
                                    {user?.following.includes(suggestedUser._id)
                                        ? "Following"
                                        : "Follow"}
                                </p>
                            </span>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default RightSidebar;
