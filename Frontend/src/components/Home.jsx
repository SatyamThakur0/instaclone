import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import styles from "./Home.module.css";
import GetSuggestedUsers from "./GetSuggestedUsers";

const Home = () => {
    return (
        <div className={`flex ${styles.home}  w-[70%]`}>
            
            <Feed className={`border-2 `} />
            <RightSidebar />
        </div>
    );
};
export default Home;
