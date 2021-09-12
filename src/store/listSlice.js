import { createSlice } from "@reduxjs/toolkit";
import { API } from ".";

const initialList = {
  list: [],
  member: "",
  updateList: false,
};

const listSlice = createSlice({
  name: "memberList",
  initialState: initialList,
  reducers: {
    getListItems(state) {},
    storeListItems(state, action) {
      state.list = state.list = action.payload;
    },
    addListItem(state, action) {
      API.addMember(action.payload);
    },
    updateListItem(state, action) {
      state.updateList = true;
      state.member = action.payload;
    },
    deleteListItem(state, action) {
      API.deleteMember(action.payload.id, action.payload.token);
    },
  },
});

export default listSlice;
