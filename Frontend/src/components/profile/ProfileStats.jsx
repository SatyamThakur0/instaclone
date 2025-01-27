export default function ProfileStats({ profile, className = "" }) {
    return (
      <div className={`flex justify-around md:justify-start space-x-4 ${className}`}>
        <div className="text-center md:text-left">
          <span className="font-bold">{profile.posts.length}</span>
          <span className="block md:inline md:ml-1 text-gray-500">posts</span>
        </div>
        <div className="text-center md:text-left">
          <span className="font-bold">{profile.followers.length}</span>
          <span className="block md:inline md:ml-1 text-gray-500">followers</span>
        </div>
        <div className="text-center md:text-left">
          <span className="font-bold">{profile.following.length}</span>
          <span className="block md:inline md:ml-1 text-gray-500">following</span>
        </div>
      </div>
    );
  }
  