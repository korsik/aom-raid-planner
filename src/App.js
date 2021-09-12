import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { authActions } from "./store";

// import Login from "./components/LoginPage/Login";
import { Suspense } from "react";
// import MainPage from "./components/MainPage/MainPage";

const Login = React.lazy(() => import("./components/LoginPage/Login"));
const MainPage = React.lazy(() => import("./components/MainPage/MainPage"));

function App() {
  const token = useSelector((state) => state.auth.isAuthenticated);
  const duration = useSelector((state) => state.auth.tokenData.duration);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      // console.log(duration);
      setTimeout(() => {
        dispatch(authActions.logout());
      }, duration);
    }
  }, [dispatch, token, duration]);

  return (
    <div className="App">
      <Suspense fallback={<p>Loading....</p>}>
        <h1>Handsome Devils Raid Planner</h1>
        {!token && <Login />}
        {token && <MainPage />}
      </Suspense>
    </div>
  );
}

export default App;
