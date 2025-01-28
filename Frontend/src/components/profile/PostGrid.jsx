import { useSelector } from "react-redux";

export default function PostGrid({ active }) {
    const { profile } = useSelector((store) => store.user);
    const posts = active === "posts" ? profile.posts : profile.saved;
    return (
        <div className="grid grid-cols-3 gap-1 md:gap-1">
            {posts.map((post) => (
                <div
                    key={post._id}
                    className="aspect-square relative flex justify-center"
                >
                    {/* Display the image */}
                    <img
                        src={post.image || "/placeholder.svg"}
                        alt={`Post ${post.id}`}
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
}
