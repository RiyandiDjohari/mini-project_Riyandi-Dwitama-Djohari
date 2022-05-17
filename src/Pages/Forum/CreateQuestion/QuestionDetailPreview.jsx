import React from 'react'
import Card from '../../../Components/Card/Card'
import Markdown from '../../../Components/Markdown/Markdown'
import classes from "./QuestionDetailPreview.module.css"

function QuestionDetailPreview({code, question}) {
  return (
    <Card className={classes.contain}>
      <h3>Your Question Detail Preview</h3>
      <Card className={classes.previewContain}>
        <Markdown str={question} />
        <Markdown str={code} />
      </Card>
    </Card>
  )
}

export default QuestionDetailPreview