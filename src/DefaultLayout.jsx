import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "./ContextProvider";
import axiosClient from "./axios-client";

const DefaultLayout = () => {
  const { setUser, setToken, user, token, notification } = useStateContext();
  const navigate = useNavigate();

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.get("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, [token]);

  useEffect(() => {}, [
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    }),
  ]);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/users"}>Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>{user.name}</div>
          <a href={"#"} onClick={onLogout} className="btn-logout">
            Logout
          </a>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default DefaultLayout;
