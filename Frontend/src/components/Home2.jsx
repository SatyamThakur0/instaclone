import React from "react";
import LeftSidebar from "./LeftSidebar";
import BottomSidebar from "./BottomSidebar";
import GetSuggestedUsers from "./GetSuggestedUsers";
import Feed2 from "./Feed2";

const Home2 = () => {
    GetSuggestedUsers();
    return (
        <>
            <div className={`flex b order-2 border-red-600 w-[96vw]`}>
                <LeftSidebar />
                <BottomSidebar />
                <Feed2 />
            </div>
        </>
    );
};

export default Home2;
