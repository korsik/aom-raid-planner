import { useState } from "react";
import { useDispatch } from "react-redux";
import { API, authActions } from "../../store";
import Input from "../UI/Input";
import classes from "./Login.module.css";

const Login = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const auth = API.login({
      email: username,
      password: password,
    });

    auth.then((data) => {
      // console.log(data);
      dispatch(
        authActions.login(
        data
        ),
      );
    });
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={classes["login-wrapper"]}>
      <h1>Please Log In</h1>
      <form onSubmit={formSubmitHandler}>
        <Input
          name="Username"
          type="text"
          value={username}
          changed={usernameChangeHandler}
        />
        <Input
          name="Password"
          type="password"
          value={password}
          changed={passwordChangeHandler}
        />
        <button className={classes["login-btn"]} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
