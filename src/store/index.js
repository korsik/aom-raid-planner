import { configureStore } from "@reduxjs/toolkit";
import laneAssignSlice from "./laneAssignSlice";

import listSlice from "./listSlice";
import { getMembers, addUpdateMember, deleteListMember } from "./listSlice";
import authSlice from "./auth";
import FirebaseAPI from "../FirebaseAPI/FirebaseAPI";

export const API = new FirebaseAPI();

const store = configureStore({
  reducer: {
    list: listSlice.reducer,
    laneAssign: laneAssignSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const listActions = {
  ...listSlice.actions,
  getMembers,
  addUpdateMember,
  deleteListMember,
};
export const laneAssignActions = laneAssignSlice.actions;
export const authActions = authSlice.actions;

export default store;
