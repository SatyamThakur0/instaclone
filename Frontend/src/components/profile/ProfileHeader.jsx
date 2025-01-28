import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileStats from "./ProfileStats";
import { useSelector } from "react-redux";

export default function ProfileHeader({ profile }) {
    const { user } = useSelector((store) => store.user);
    return (
        <div className="borde r-2 border-red-500 flex flex-row items-center md:items-center justify-between">
            <div className="flex flex-row items-center bo rder-2 border-red-500">
                <Avatar className="w-24 h-24 md:w-52 md:h-52  ml-4">
                    <AvatarImage
                        src={profile.profilePicture}
                        alt={profile.name}
                    />
                    <AvatarFallback>
                        {profile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="mt -4 md:mt -4 md:ml-8 text-center md:text-left">
                    <div className="flex flex-col items-start ml-3 md:flex-row md:items-center">
                        <h1 className="md:text-2xl text-lg font-bold">
                            {profile.username}
                        </h1>
                    </div>
                    {/* ProfileStats component is included */}
                    <ProfileStats
                        profile={profile}
                        className="mt-4 hidden md:flex"
                    />
                    <div className="bord er-2 border-red-500 flex flex-col items-start mt-1 ml-3">
                        <h2 className="font-semibold">{profile.name}</h2>
                        <p className="text-sm">{profile.bio}</p>
                    </div>
                </div>
            </div>
            <div className="bord er-2 h-28 border-red-600 mr-2">
                {user._id !== profile._id ? (
                    <div className="mt-2 md:mt-0 md:ml-4 space-x-2 flex flex-col md:flex-row items-end gap-1">
                        <Button className="w-fit h-8">Follow</Button>
                        <Button className="bg-gray-500 w-fit h-8">
                            Message
                        </Button>
                    </div>
                ) : (
                    <div className="mt-2 md:mt-0 md:ml-4 space-x-2 flex flex-col md:flex-row items-end gap-1">
                        <Button className="w-fit h-8">Logout</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
