import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authLogout } from "../../../store/actions/index";

const Logout = (props) => {
  const dispatch = useDispatch();

  useEffect(
    () => async () => {
      dispatch(authLogout());
    },
    [dispatch]
  );
  return <Redirect to="/" />;
};

export default Logout;
