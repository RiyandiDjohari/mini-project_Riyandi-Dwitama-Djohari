import React from 'react';
import Card from '../../../Components/Card/Card';
import classes from "./TitleInput.module.css";

function TitleInput({value, onChange}) {
  return (
    <Card className={classes.contain}>
      <h3>Your Title Here (max 35 character)</h3>
      <input type="text" value={value} onChange={onChange} required/>
    </Card>
  )
}

export default TitleInput