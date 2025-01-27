import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

function UserList() {
  const { suggestedUsers } = useSelector((store) => store.user);
  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold mb-4">Active Users</h2>
      <div className="flex space-x-2 overflow-x-auto">
        {suggestedUsers.map((user) => (
          <div key={user._id} className="flex flex-col items-center">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs mt-1">{user.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
