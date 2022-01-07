import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import store, { API } from ".";

const initialList = {
  list: [],
  member: "",
  updateList: false,
};

export const getMembers = createAsyncThunk(
  "memberList/getMembers",
  async () => {
    const { auth } = store.getState();
    if (auth.tokenData.token && auth.tokenData.token !== "") {
      const response = await API.getMember(auth.tokenData.token);
      return response;
    }
    return "You have to Log in!";
  },
);

export const addUpdateMember = createAsyncThunk(
  "memberList/addUpdateMember",
  async (member) => {
    const { auth, list } = store.getState();
    if (!auth.tokenData.token && auth.tokenData.token === "")
      return "You have to Log in!";
    let response;
    if (list.updateList) {
      response = API.updateMember(
        {
          name: member.name,
          role: member.role,
          power: member.power,
          lane: member.lane,
          team: member.team,
        },
        member.id,
        auth.tokenData.token,
      );
    } else {
      response = API.addMember(
        {
          name: member.name,
          role: member.role,
          power: member.power,
          lane: member.lane,
          team: member.team,
        },
        auth.tokenData.token,
      );
    }
    return response;
  },
);

export const deleteListMember = createAsyncThunk(
  "memberList/deleteListMember",
  async (id) => {
    const { auth, list } = store.getState();
    if (!list.updateList) return;
    if (!auth.tokenData.token && auth.tokenData.token === "")
      return "You have to Log in!";
    const response = await API.deleteMember(id, auth.tokenData.token);
    return response;
  },
);

const listSlice = createSlice({
  name: "memberList",
  initialState: initialList,
  reducers: {
    getListItems(state, action) {},
    storeListItems(state, action) {
      state.list = action.payload;
    },
    addListItem(state, action) {
      state.updateList = false;
      state.member = "";
    },
    updateListItem(state, action) {
      state.updateList = true;
      state.member = action.payload;
    },
    deleteListItem(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getMembers.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(addUpdateMember.fulfilled, (state, action) => {
      if (state.updateList) {
        const index = state.list.findIndex(
          (member) => member.id === action.payload.id,
        );
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
    });
    builder.addCase(deleteListMember.fulfilled, (state, action) => {
      const index = state.list.findIndex(
        (member) => member.id === action.payload,
      );
      if (index > -1) {
        state.list.splice(index, 1);
      }
    });
  },
});

export default listSlice;
