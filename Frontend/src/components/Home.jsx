import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import styles from "./Home.module.css";
import useWindowSize from "./UseWindowSize";

const Home = () => {
    const window = useWindowSize();
    return (
        <div
            className={`flex ${
                window.width > 1140 || (window.width < 1040 && window.width > 820)? "left-[28%]" : "left-[22%]"
            } ${
                window.width < 820 && 'left-[16%]'
            }  relative w-[461px]`}
        >
            <Feed className={`border-2 `} />
            {window.width > 1040 && <RightSidebar />}
        </div>
    );
};
export default Home;
