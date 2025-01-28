import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postsSlice from "./postsSlice";
import chatSlice from "./chatSlice";
import notificationSlice from "./notificationSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    posts: postsSlice.reducer,
    user: userSlice.reducer,
    chat: chatSlice.reducer,
    notification: notificationSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore paths that include `register` or other non-serializable values
            ignoredPaths: ['register'],
            ignoredActions: ['persist/PERSIST'],
          },
        }),
});

export default Store;
