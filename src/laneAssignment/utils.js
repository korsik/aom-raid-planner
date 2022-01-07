export const limitNamesToFiceLetters = (result) => {
  for (let items = 0; items < result.length; items++) {
    for (let member = 0; member < result[items].length; member++) {
      let filterHashtag = result[items][member].name;
      if (filterHashtag.indexOf("#") > -1) {
        filterHashtag = filterHashtag.substring(
          0,
          result[items][member].name.indexOf("#"),
        );
      }
      if (filterHashtag.length > 5) {
        filterHashtag = filterHashtag.substring(0, 5);
      }
      result[items][member] = " " + filterHashtag;
    }
  }
};

// ===============================================================================

export const RandomizeMembers = (memberList) => {
  const result = [[], [], []];

  let officers = memberList.filter(
    (member) => member.role === "officer" || member.role === "leader",
  );
  officers = officers.sort(() => Math.random() - 0.5);

  let members = memberList.filter(function (obj) {
    return officers.indexOf(obj) === -1;
  });
  members = members.sort(() => Math.random() - 0.5);

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
  result[0] = result[0].sort(() => Math.random() - 0.5);
  result[1] = result[1].sort(() => Math.random() - 0.5);
  result[2] = result[2].sort(() => Math.random() - 0.5);

  checkAssignedPositions(result);

  return result;
};

// ===============================================================================

export const checkAssignedPositions = (memberList) => {
  // const res = memberList;
  for (let line = 0; line < memberList.length; line++) {
    for (let lane = 0; lane < memberList[line].length; lane++) {
      if (memberList[line][lane].team === "random") {
        continue;
      }
      if (
        memberList[line][lane].team - 1 === line &&
        memberList[line][lane].lane === "random"
      ) {
        continue;
      }
      if (memberList[line][lane].lane === "random") {
        const r_lane = memberList[line].find(
          (member) => member.lane === "random" && member.team === "random",
        );

        const tmp =
          memberList[memberList[line][lane].team - 1][
            memberList[line].indexOf(r_lane)
          ];

        memberList[memberList[line][lane].team - 1][
          memberList[line].indexOf(r_lane)
        ] = memberList[line][lane];
        memberList[line][lane] = tmp;
      } else {
        const tmp =
          memberList[memberList[line][lane].team - 1][
            memberList[line][lane].lane - 1
          ];

        memberList[memberList[line][lane].team - 1][
          memberList[line][lane].lane - 1
        ] = memberList[line][lane];
        memberList[line][lane] = tmp;
      }
    }
  }
};
