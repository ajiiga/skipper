import React from "react";
import s from "./AuthContainer.module.css";

const AuthContainer = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default AuthContainer;
