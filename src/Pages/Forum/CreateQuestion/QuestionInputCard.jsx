import React from 'react'
import Card from '../../../Components/Card/Card'
import TextEditor from '../../../Components/Editor/TextEditor'
import classes from "./QuestionInputCard.module.css"

function QuestionInputCard({editorState, onChangeEditorState}) {
  return (
    <>
      <Card className={classes.contain}>
        <h3>Question Detail</h3>
        <p>
          Add some detail for your question that describe the problem you are
          facing.
        </p>
      </Card>
      <TextEditor editorState={editorState} onChange={onChangeEditorState}/>
    </>
  )
}

export default QuestionInputCard