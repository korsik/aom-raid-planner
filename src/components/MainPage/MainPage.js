import classes from "./MainPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import AddBtn from "./AddBtn/AddBtn";
import List from "./ListItem/List";
import LaneAssign from "./LaneAssign/LaneAssign";
import MemberForm from "../MemberForm/MemberForm";
import { laneAssignActions, listActions } from "../../store";
import { Fragment, useEffect, useState } from "react";

const MainPage = () => {
  const dispatch = useDispatch();

  let list = useSelector((state) => state.list.list);
  useEffect(() => {
      dispatch(listActions.getMembers());
  }, [dispatch]);

  const [formIsShown, setFormIsShown] = useState(false);

  const showMemberFormHandler = () => {
    setFormIsShown(true);
  };

  const hideMemberFormHandler = () => {
    setFormIsShown(false);
  };

  const addMemberFormHandler = () => {
    dispatch(listActions.addListItem());
    setFormIsShown(true);
  };

  function generateLaneAssignmentHandler() {
    dispatch(laneAssignActions.generateLaneAssignment(list));
  }

  return (
    <Fragment>
      <div className={classes.Main}>
        <LaneAssign generate={generateLaneAssignmentHandler} />
        <div className={classes.ListWrappper}>
          <h2>Members</h2>
          <List list={list} onOpen={showMemberFormHandler} />
          <AddBtn onOpen={addMemberFormHandler} />
        </div>
      </div>
      {formIsShown && <MemberForm onClose={hideMemberFormHandler} />}
    </Fragment>
  );
};

export default MainPage;
