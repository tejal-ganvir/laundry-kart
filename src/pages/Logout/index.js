import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLocationData } from "../../store/actions/locationActions";
import { LogoutStart } from "../../store/actions/loginActions";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LogoutStart());
    dispatch(setLocationData(null));
    navigate("/login");
  }, []);

  return <div></div>;
};

export default Logout;
