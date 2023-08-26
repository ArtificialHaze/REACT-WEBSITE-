import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "./ContextProvider";

const GuestLayout = () => {
  const { token } = useStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      return navigate("/users");
    }
  }, [token]);

  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
