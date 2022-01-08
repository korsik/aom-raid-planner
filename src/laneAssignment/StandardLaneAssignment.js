import { assignMembersPositions, limitNamesToFiceLetters } from "./utils";

const StandardLaneAssignment = (member) => {
  const tmpList = [...member];

  const result = assignMembersPositions(tmpList);

  limitNamesToFiceLetters(result);

  const assignment = "team1: "
    .concat(result[0].slice(0, result[0].length - 2))
    .concat(", (")
    .concat(result[0].slice(result[0].length - 2, result[0].length))
    .concat(" )")
    .concat(" team2:")
    .concat(result[1].slice(0, result[1].length - 2))
    .concat(", (")
    .concat(result[1].slice(result[1].length - 2, result[1].length))
    .concat(" )")
    .concat(" team3: ")
    .concat(result[2].slice(0, result[2].length - 2))
    .concat(", (")
    .concat(result[2].slice(result[2].length - 2, result[2].length))
    .concat(" )");

  return assignment;
};

export default StandardLaneAssignment;
