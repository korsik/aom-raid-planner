import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FirebaseAPI from "../../FirebaseAPI/FirebaseAPI";
import {
  lane_options,
  power_options,
  role_options,
  team_options,
} from "../../models/member_options";
import { listActions } from "../../store";
import Input, { input_style } from "../UI/Input";
import Modal from "../UI/Modal";
import classes from "./MemberForm.module.css";

const MemberForm = (props) => {
  const listState = useSelector((state) => state.list.updateList);
  const member = useSelector((state) => state.list.member);
  const token = useSelector(state => state.auth.tokenData.token);
  const dispatch = useDispatch();
  const [name, setName] = useState(member ? member.name : "");
  const [role, setRole] = useState(
    member ? member.role : role_options[0].value,
  );
  const [power, setPower] = useState(
    member ? member.power : power_options[0].value,
  );
  const [lane, setLane] = useState(
    member ? member.lane : lane_options[0].value,
  );
  const [team, setTeam] = useState(
    member ? member.team : team_options[0].value,
  );

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const roleChangeHandler = (event) => {
    setRole(event.target.value);
  };

  const powerChangeHandler = (event) => {
    setPower(event.target.value);
  };

  const laneChangeHandler = (event) => {
    setLane(event.target.value);
  };

  const teamChangeHandler = (event) => {
    setTeam(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (listState) {
      const api = new FirebaseAPI();
      api.updateMember(
        {
          name: name,
          role: role,
          power: power,
          lane: lane,
          team: team,
        },
        member.id,
        token
      );
    }
    props.onClose();
  };

  const deleteMemberHandler = (event) => {
    event.preventDefault();
    // console.log("DELETE THE MEMBER");
    if (listState) {
      dispatch(listActions.deleteListItem({id: member.id, token: token}));
    }
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.Wrapper}>
        <form onSubmit={formSubmitHandler}>
          <Input
            name="Name"
            type="text"
            value={name}
            changed={nameChangeHandler}
          />
          <Input
            input_style={input_style.ROLE_INPUT}
            name="Role"
            type="text"
            value={role}
            changed={roleChangeHandler}
          />
          <Input
            input_style={input_style.POWER_INPUT}
            name="Power"
            type="text"
            value={power}
            changed={powerChangeHandler}
          />
          <Input
            input_style={input_style.LANE_INPUT}
            name="Lane"
            type="text"
            value={lane}
            changed={laneChangeHandler}
          />
          <Input
            input_style={input_style.TEAM_INPUT}
            name="Team"
            type="text"
            value={team}
            changed={teamChangeHandler}
          />
          <button className={classes.Btn} type="submit">
            {props.type}SAVE
          </button>
          <button
            disabled={listState ? false : true}
            className={[classes.Btn, classes.Delete].join(" ")}
            onClick={deleteMemberHandler}
          >
            DELETE
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default MemberForm;
