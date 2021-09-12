import { useDispatch } from "react-redux";
import { listActions } from "../../../store";
import classes from "./List.module.css";

const ListItem = (props) => {
  const dispatch = useDispatch();
  const onItemClickedHandler = () => {
    dispatch(listActions.updateListItem(props.item));
    props.open();
  };
  let team = "";
  if (props.item.team === "1") {
    team = classes["Team1"];
  }
  if (props.item.team === "2") {
    team = classes["Team2"];
  }
  if (props.item.team === "3") {
    team = classes["Team3"];
  }
  return (
    <li
      className={`${classes.li} ${team}`} //
      onClick={onItemClickedHandler}
    >
      {props.item.name}
    </li>
  );
};

const List = (props) => {
  return (
    <div className={classes.ListContainer}>
      <ul className={classes.ul}>
        {props.list.map((item) => (
          <ListItem key={item.id} item={item} open={props.onOpen} />
        ))}
      </ul>
    </div>
  );
};

export default List;
