import React, { useRef, useState } from "react";
import { Camera, Loader2, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { userActions } from "@/store/userSlice";
import LeftSidebar from "./LeftSidebar";
import BottomSidebar from "./BottomSidebar";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(true);
  const inputRef = useRef();
  const [input, setInput] = useState({
    profilePicture: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender || "male",
  });
  const [img, setimg] = useState(user?.profilePicture);

  const fileChangeHandler = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    const imageUrl = URL.createObjectURL(file);
    setimg(imageUrl);
    if (file) console.log(file);
    else console.log("not working");
    setInput({ ...input, profilePicture: file });
    setOpen(false);
  };

  const editProfile = async (e) => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    e.preventDefault();
    try {
      setUpdated(false);
      const formData = new FormData();
      formData.append("profilePicture", input.profilePicture);
      formData.append("bio", input.bio);
      formData.append("gender", input.gender);
      formData.append("token", token);
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/edit`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      res = await res.json();
      console.log(res);

      if (res.success) {
        navigate(`/profile/${user._id}`);
        toast.success(res.message);
        const payload = {
          ...user,
          bio: input.bio,
          profilePicture: res.User.profilePicture,
          gender: input.gender,
        };
        dispatch(userActions.setUser(payload));
        dispatch(userActions.setProfile(payload));
        localStorage.setItem("user", JSON.stringify(payload));
        localStorage.setItem("profile", JSON.stringify(payload));
        setUpdated(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdated(true);
    }
  };

  return (
    <div>
      <LeftSidebar />
      <BottomSidebar />
      <div className="min-h-screen bg-gray-50 sm:ml-[75px] lg:ml-[160px]">
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 mb-[75px]">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Profile
          </h1>

          <form onSubmit={editProfile} className="space-y-6">
            {/* Profile Photo Section */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={img}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    onChange={(e) => {
                      fileChangeHandler(e);
                      console.log(e);
                    }}
                    ref={inputRef}
                    className="hidden"
                    type="file"
                  />
                  <button
                    type="button"
                    onClick={() => inputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
                  >
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user?.username}
                  </h2>
                  <p className="text-gray-600">{user?.name}</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow space-y-4">
              {/* <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={input.username}
                  onChange={(e) =>
                    setInput({ ...input, username: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div> */}

              {/* <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={input.name}
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div> */}

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows="3"
                  value={input.bio}
                  onChange={(e) => setInput({ ...input, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={input.gender}
                  onChange={(e) =>
                    setInput({ ...input, gender: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              {updated ? (
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors focus:outline-none font-semibold"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors focus:outline-none    flex items-center gap-1 font-semibold opacity-60 disabled"
                >
                  <Loader2 className="h-[20px] w-[20px] animate-spin" />
                  Updating
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
