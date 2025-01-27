import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileStats from "./ProfileStats";
import { useSelector } from "react-redux";

export default function ProfileHeader({ profile }) {
    const { user } = useSelector((store) => store.user);
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start">
            <Avatar className="w-20 h-20 md:w-36 md:h-36">
                <AvatarImage src={profile.profilePicture} alt={profile.name} />
                <AvatarFallback>
                    {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold">{profile.username}</h1>
                    {user._id !== profile._id && (
                        <div className="mt-2 md:mt-0 md:ml-4 space-x-2">
                            <Button>Follow</Button>
                            <Button variant="outline">Message</Button>
                        </div>
                    )}
                </div>
                {/* ProfileStats component is included */}
                <ProfileStats
                    profile={profile}
                    className="mt-4 hidden md:flex"
                />
                <div className="mt-4">
                    <h2 className="font-bold">{profile.name}</h2>
                    <p className="mt-1">{profile.bio}</p>
                </div>
            </div>
        </div>
    );
}
