import { createSlice } from "@reduxjs/toolkit";

const initialLaneAssign = {
  laneAssignment: "",
};

const laneAssignSlice = createSlice({
  name: "laneAssignment",
  initialState: initialLaneAssign,
  reducers: {
    generateLaneAssignment(state, action) {
      const tmpList = [...action.payload];
      const result = [[], [], []];

      let officers = tmpList.filter(
        (member) => member.role === "officer" || member.role === "leader",
      );
      officers = officers.sort(() => Math.random() - 0.5)

      let members = tmpList.filter(function (obj) {
        return officers.indexOf(obj) === -1;
      });
      members = members.sort(() => Math.random() - 0.5)

      let n = 0;

      // Add the officers on lanes
      for (let line = 0; line < officers.length; line++) {
        result[n].push(officers[line]);
        n++;
        if (n > 2) {
          n = 0;
        }
      }

      // Add the members on lanes (n = where it left of from officers)
      for (let line = 0; line < members.length; line++) {
        result[n].push(members[line]);
        n++;
        if (n > 2) {
          n = 0;
        }
      }

      // Shuffle again the 3 teams
      result[0] = result[0].sort(() => Math.random() - 0.5)
      result[1] = result[1].sort(() => Math.random() - 0.5)
      result[2] = result[2].sort(() => Math.random() - 0.5)

      // Extract only the first 5 letters of member name or all
      //  the name without the # if the name is < than 5 letters
      for (let items = 0; items < result.length; items++) {
        for (let member = 0; member < result[items].length; member++) {
          let filterHashtag = result[items][member].name.substring(
            0,
            result[items][member].name.indexOf("#"),
          );
          if (filterHashtag.length > 5) {
            filterHashtag = filterHashtag.substring(0, 6);
          }
          result[items][member] = " " + filterHashtag;
        }
      }
      state.laneAssignment = "team1: "
        .concat(result[0])
        .concat(" team2:")
        .concat(result[1])
        .concat(" team3: ")
        .concat(result[2]);
    },
  },
});

export default laneAssignSlice;
