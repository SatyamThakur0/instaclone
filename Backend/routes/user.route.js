import { Router } from "express";
import {
    registerUser,
    getAllUsers,
    loginUser,
    logout,
    getProfile,
    getSuggestedUser,
    followOrUnfollow,
    editProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/userAuthentication.js";
import upload from "../middlewares/multer.js";
import { getSavedPost } from "../controllers/post.controller.js";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/login", loginUser);
userRouter.post("/signup", registerUser);
userRouter.post("/logout", logout);
userRouter.get("/profile/:id", getProfile);
userRouter.post("/suggested", isAuthenticated, getSuggestedUser);
userRouter.post("/profile/saved/:id", isAuthenticated, getSavedPost);
userRouter.post("/followorunfollow/:id", isAuthenticated, followOrUnfollow);
userRouter.post(
    "/profile/edit",
    upload.single("profilePicture"),
    isAuthenticated,
    editProfile
);
