import React from "react";
import {
  lane_options,
  power_options,
  role_options,
  team_options,
} from "../../models/member_options";

import classes from "./Input.module.css";

export const input_style = {
  SIMPLE_INPUT: "simple_input",
  ROLE_INPUT: "role_input",
  POWER_INPUT: "power_input",
  LANE_INPUT: "lane_input",
  TEAM_INPUT: "team_input",
};

const Input = (props) => {
  let input = (
    <input
      className={classes.InputElement}
      type={props.type}
      value={props.value}
      onChange={props.changed}
    />
  );
  switch (props.input_style) {
    case input_style.SIMPLE_INPUT:
      input = (
        <input
          className={classes.InputElement}
          type={props.type}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case input_style.ROLE_INPUT:
      input = (
        <select
          className={classes.InputElement}
          name="Role"
          id="role"
          value={props.value}
          onChange={props.changed}
        >
          {role_options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case input_style.POWER_INPUT:
      input = (
        <select
          className={classes.InputElement}
          name="Power"
          id="power"
          value={props.value}
          onChange={props.changed}
        >
          {power_options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case input_style.LANE_INPUT:
      input = (
        <select
          className={classes.InputElement}
          name="Lane"
          id="lane"
          value={props.value}
          onChange={props.changed}
        >
          {lane_options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case input_style.TEAM_INPUT:
      input = (
        <select
          className={classes.InputElement}
          name="Team"
          id="team"
          value={props.value}
          onChange={props.changed}
        >
          {team_options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    default:
      input = (
        <input
          className={classes.InputElement}
          type={props.type}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div classes={classes.Input}>
      <label className={classes.Label}>{props.name}</label>
      {input}
    </div>
  );
};

export default Input;
