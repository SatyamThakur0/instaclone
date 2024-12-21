import BottomSidebar from "./BottomSidebar";
import useWindowSize from "./UseWindowSize";

const LeftSidebarItem = ({ item, handleSidebar }) => {
    const window = useWindowSize();
    return (
        <>
            <div
                className={`flex py-2 px-3 w-full h-[50px] items-center hover:bg-gray-300 transition-colors cursor-pointer rounded-md justify-start gap-3 bordner-2 border-green-700`}
            >
                <div>{item.icon}</div>
                <span className="hidden md:block bordner-2 border-red-900">
                    {item.itemName}
                </span>
            </div>
        </>
    );
};
export default LeftSidebarItem;
