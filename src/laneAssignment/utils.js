export const limitNamesToFiceLetters = (result) => {
  for (let items = 0; items < result.length; items++) {
    for (let member = 0; member < result[items].length; member++) {
      let filterHashtag = result[items][member].name;
      if (!filterHashtag) {
        result[items][member] = " _";
        continue;
      }
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

  // checkAssignedPositions(result);

  return result;
};

// ===============================================================================

export const assignMembersPositions = (memberList) => {
  // const result3 = [...Array(3)].map((x) => Array(10));
  const template_list = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ];

  const end_list = [
    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ];

  let officers = memberList.filter(
    (member) => member.role === "officer" || member.role === "leader",
  );
  officers = officers.sort(() => Math.random() - 0.5);

  let members = memberList.filter(function (obj) {
    return officers.indexOf(obj) === -1;
  });
  members = members.sort(() => Math.random() - 0.5);

  assignMembs(officers, end_list, template_list);

  assignMembs(members, end_list, template_list);

  return end_list;
};

const assignMembs = (memberList, end_list, template_list) => {
  memberList.map((member) => {
    let min_team = template_list
      .map((a) => a.length)
      .indexOf(Math.max(...template_list.map((a) => a.length)));
    if (member.team !== "random") {
      min_team = member.team - 1;
    }
    let min_lane = template_list[min_team][0];

    if (member.lane !== "random") {
      const index = template_list[min_team].indexOf(+member.lane - 1);
      template_list[min_team][0] = template_list[min_team][index];
      template_list[min_team][index] = min_lane;
      min_lane = template_list[min_team][0];
    }
    template_list[min_team].shift();
    end_list[min_team][min_lane] = member;
    return 5;
  });
};
