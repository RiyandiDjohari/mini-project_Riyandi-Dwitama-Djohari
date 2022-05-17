import React from 'react'
import Card from '../../../Components/Card/Card'
import TextEditor from '../../../Components/Editor/TextEditor'
import classes from "./CodeInputCard.module.css";

function CodeInputCard({ editorState, onChangeEditorState }) {
  return (
    <>
      <Card className={classes.contain}>
        <h3>Your Code (if any)</h3>
      </Card>
      <TextEditor editorState={editorState} onChange={onChangeEditorState} />
    </>
  )
}

export default CodeInputCard