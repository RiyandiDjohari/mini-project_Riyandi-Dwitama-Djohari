import React from "react";
import classes from "./FormControl.module.css";

function FormControl({ label, value, onChange, type }) {
  
  return (
    <div className={classes.formControl}>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea value={value} onChange={onChange} col="50" rows="4"></textarea>
      ) : (
        <input value={value} onChange={onChange} type={type} />
      )}
    </div>
  );
}

export default FormControl;
