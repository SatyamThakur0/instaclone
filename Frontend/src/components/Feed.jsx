import Posts from "./Posts";
import styles from "./Home.module.css";

const Feed = () => {
    return (
        <div className={`${styles.feed} w-[700px]`}>
            <Posts />
        </div>
    );
};

export default Feed;
