import React from "react";
import LeftSidebar from "./LeftSidebar";
import BottomSidebar from "./BottomSidebar";
import Feed2 from "./Feed2";

const Home2 = () => {
    return (
        <>
            <div className={`w-[97vw]`}>
                <LeftSidebar />
                <BottomSidebar />
                <Feed2 />
            </div>
        </>
    );
};

export default Home2;
