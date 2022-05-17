import { AddComment } from '@mui/icons-material';
import React from 'react';
import classes from "./CommentButton.module.css";

function CommentButton({ onClick, className, style}) {
  return (
    <button onClick={onClick} style={{ ...style}} className={`${classes.btn} ${className}`}>
      <AddComment/>
      Add a comment
    </button>
  );
}

export default CommentButton