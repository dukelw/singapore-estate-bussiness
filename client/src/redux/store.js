import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import historyReducer from "./historySlice";
import chapterReducer from "./chapterSlice";
import uploadReducer from "./uploadSlice";
import sliderReducer from "./sliderSlice";
import commentReducer from "./commentSlice";
import notificationReducer from "./notificationSlice";
import estateReducer from "./estateSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  chapter: chapterReducer,
  history: historyReducer,
  user: userReducer,
  upload: uploadReducer,
  slider: sliderReducer,
  comment: commentReducer,
  notification: notificationReducer,
  estate: estateReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
