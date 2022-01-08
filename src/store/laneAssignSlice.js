import { createSlice } from "@reduxjs/toolkit";
import LaneAssignmentManager from "../laneAssignment/LaneAssignmentManager";

const initialLaneAssign = {
  laneAssignment: "",
  isFieldValid: "",
};

const laneAssignSlice = createSlice({
  name: "laneAssignment",
  initialState: initialLaneAssign,
  reducers: {
    resetIsFieldValid(state, action) {
      state.isFieldValid = "";
    },
    generateLaneAssignment(state, action) {
      const nList = LaneAssignmentManager.standardLaneAssignment(
        action.payload,
      );
      state.laneAssignment = nList;
    },
    checkValidName(state, action) {
      // if (action.payload.name === "") {
      //   state.isFieldValid = "The name can't be empty!";
      // } else {
        action.payload.setName(action.payload.name);
      // }
    },
    checkValidTeam(state, action) {
      if (
        !action.payload.memberList ||
        action.payload.memberList.length === 0
      ) {
        state.isFieldValid = "";
        action.payload.setTeam(action.payload.team);
        return;
      }
      if (action.payload.lane === "random") {
        if (checkTeamLength(action.payload.memberList, action.payload.team)) {
          state.isFieldValid = "";
          action.payload.setTeam(action.payload.team);
        } else {
          state.isFieldValid = "The team is full!";
        }
      } else if (action.payload.team === "random") {
        state.isFieldValid = "";
        action.payload.setTeam(action.payload.team);
      } else {
        if (
          checkAssignedLaneInTeam(
            action.payload.memberList,
            action.payload.team,
            action.payload.lane,
          )
        ) {
          state.isFieldValid = "";
          action.payload.setTeam(action.payload.team);
        } else {
          state.isFieldValid = "The team is full at this lane!";
        }
      }
    },
    checkValidLane(state, action) {
      if (
        !action.payload.memberList ||
        action.payload.memberList.length === 0
      ) {
        state.isFieldValid = "";
        action.payload.setLane(action.payload.lane);
        return;
      }

      if (action.payload.team !== "random") {
        if (!checkTeamLength(action.payload.memberList, action.payload.team)) {
          state.isFieldValid = "The team is Full";
          return;
        }
      }
      if (
        checkAssignedLaneInTeam(
          action.payload.memberList,
          action.payload.team,
          action.payload.lane,
        )
      ) {
        state.isFieldValid = "";
        action.payload.setLane(action.payload.lane);
      } else {
        state.isFieldValid = "This lane is full!";
      }
    },
  },
});

const checkTeamLength = (memberList, team) => {
  const team1 = memberList.filter((member) => member.team === team);
  if (team1.length <= 10) {
    return true;
  }
  return false;
};

const checkAssignedLaneInTeam = (memberList, team, lane) => {
  let ap = "";

  if (team !== "random") {
    ap = memberList.filter(
      (member) => member.team === team && member.lane === lane,
    );
    if (ap.length > 0) {
      return false;
    }
  } else {
    ap = memberList.filter((member) => member.lane === lane);
    if (ap.length > 2) {
      return false;
    }
  }
  return true;
};

export default laneAssignSlice;
