import Posts from "./Posts";
import styles from "./Home.module.css";

const Feed = () => {
    return (
        <div className={`${styles.feed} w-[700px] bomrder-2 border-red-800`}>
            <Posts />
        </div>
    );
};

export default Feed;
