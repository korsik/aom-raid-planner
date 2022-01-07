import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  tokenData: {
    token: "",
    duration: "",
  },
  isAuthenticated: false,
};

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const initialize = () => {
  const tokenData = retrieveStoredToken();

  if (tokenData) {
    return {
      tokenData: tokenData,
      isAuthenticated: true,
    };
  }

  return initialAuthState;
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialize(),
  reducers: {
    login(state, actions) {
      if (!!actions.payload) {
        const time = new Date(
          new Date().getTime() + +actions.payload.expiresIn * 1000,
        );
        const remainingTime = calculateRemainingTime(time);

        state.tokenData = {
          token: actions.payload.idToken,
          duration: remainingTime,
        };
        state.isAuthenticated = true;
        localStorage.setItem("token", actions.payload.idToken);
        localStorage.setItem("expirationTime", time);
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.tokenData = initialAuthState;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    },
  },
});

export default authSlice;
