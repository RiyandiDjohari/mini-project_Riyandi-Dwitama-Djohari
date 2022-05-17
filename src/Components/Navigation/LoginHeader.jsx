import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import classes from "./LoginHeader.module.css";

function LoginHeader() {
  return (
    <>
      <Link to="/login">
        <Button className={classes.btn} theme="dark">
          LOGIN
        </Button>
      </Link>
      <Link to="/register">
        <Button className={classes.btn} theme="light">
          REGISTER
        </Button>
      </Link>
    </>
  );
}

export default LoginHeader;
