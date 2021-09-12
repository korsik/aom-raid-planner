import { Fragment } from "react";
import { useSelector } from "react-redux";

import classes from "./LaneAssign.module.css";

const LaneAssign = (props) => {
  const laneAssignment = useSelector(
    (state) => state.laneAssign.laneAssignment,
  );

  var names = laneAssignment;
  return (
    <Fragment>
      <h2>Lane Assignment</h2>
      <p className={classes.LaneAsgn}>{names}</p>
      <button className={classes.GenerateBtn} onClick={props.generate}>
        Generate
      </button>
    </Fragment>
  );
};

export default LaneAssign;
