import { Link } from "react-router-dom";
import styles from "./SidebarItem.module.css";
import useWindowSize from "./UseWindowSize";

const SidebarItem = ({ item, handleSidebar }) => {
    const window = useWindowSize();
    return (
        <div
            className={`flex py-2 px-3 w-full h-[50px] items-center hover:bg-gray-300 transition-colors cursor-pointer rounded-md justify-start gap-3 bordner-2 border-green-700`}
            onClick={() => handleSidebar(item.itemName)}
        >
            <div>{item.icon}</div>
            {window.width > 820 && (
                <span className="bordner-2 border-red-900">{item.itemName}</span>
            )}
        </div>
    );
};
export default SidebarItem;
