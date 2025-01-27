import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileTabs from "./ProfileTabs";
import { useSelector } from "react-redux";
import LeftSidebar from "../LeftSidebar";
import BottomSidebar from "../BottomSidebar";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts");
    const { profile } = useSelector((store) => store.user);

    return (
        <div>
            <LeftSidebar />
            <BottomSidebar />
            <div className="b order-2 border-red-600 max-w-4xl mx-auto md:px-10 sm:px-0 py-8 sm:ml-[75px] lg:ml-[160px]">
                <ProfileHeader profile={profile} />
                <ProfileStats profile={profile} className="mt-4 md:hidden" />
                <div className="mt-8">
                    <ProfileTabs onTabChange={setActiveTab} />
                </div>
            </div>
        </div>
    );
}
