import classes from "./MainPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import AddBtn from "./AddBtn/AddBtn";
import List from "./ListItem/List";
import LaneAssign from "./LaneAssign/LaneAssign";
import MemberForm from "../MemberForm/MemberForm";
import { authActions, laneAssignActions, listActions } from "../../store";
import { Fragment, useEffect, useState } from "react";
import FirebaseAPI from "../../FirebaseAPI/FirebaseAPI";

const MainPage = () => {
  const token = useSelector((state) => state.auth.tokenData.token);
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  useEffect(() => {
    if (token && token !== "") {
      const api = new FirebaseAPI();
      api.getMember(setList, token);
    }
  }, [token]);

  useEffect(() => {
    dispatch(listActions.storeListItems(list));
  }, [dispatch, list]);

  const [cartIsShown, setCartIsShown] = useState(false);

  const showMemberFormHandler = () => {
    setCartIsShown(true);
  };

  const hideMemberFormHandler = () => {
    setCartIsShown(false);
  };

  function generateLaneAssignmentHandler() {
    dispatch(laneAssignActions.generateLaneAssignment(list));
    // dispatch(authActions.logout());
  }

  return (
    <Fragment>
      <div className={classes.Main}>
        <LaneAssign generate={generateLaneAssignmentHandler} />
        <div className={classes.ListWrappper}>
          <h2>Members</h2>
          <List list={list} onOpen={showMemberFormHandler} />
          <AddBtn onOpen={showMemberFormHandler} />
        </div>
      </div>
      {cartIsShown && <MemberForm onClose={hideMemberFormHandler} />}
    </Fragment>
  );
};

export default MainPage;
