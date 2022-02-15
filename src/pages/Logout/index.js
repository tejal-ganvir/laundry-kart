import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutStart } from "../../store/actions/loginActions";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LogoutStart());
    navigate("/login");
  }, []);

  return <div></div>;
};

export default Logout;
