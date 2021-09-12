import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";

import classes from "./AddBtn.module.css";

const AddBtn = (props) => {
  return (
    <div className={classes.IconDiv}>
      <IconContext.Provider value={{ className: classes.IconBtn }}>
        <FaPlusCircle size="40" onClick={props.onOpen} />
      </IconContext.Provider>
    </div>
  );
};

export default AddBtn;
