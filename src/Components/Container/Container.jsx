import React from "react";
import classes from "./Container.module.css";

function Container({ className, children }) {
  return (
    <div className={classes.background}>
      <div className={`${classes.container} ${className}`}>{children}</div>
    </div>
  );
}

export default Container;
