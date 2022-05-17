import classes from "./CreateQuestion.module.css";
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from '@mui/material/node_modules/@mui/system';
import { CircularProgress } from '@mui/material';
import { useCreateQuestion } from '../../../Hooks/useCreateQuestion';
import { EditorState } from 'draft-js';
import { draftjsToMd } from 'draftjs-md-converter';
import { convertToRaw } from 'draft-js';
import date from "date-and-time";
// Components
import TitleInputCard from './TitleInputCard';
import TagInputCard from './TagInputCard';
import QuestionInputCard from './QuestionInputCard';
import CodeInputCard from './CodeInputCard';
import QuestionDetailPreview from './QuestionDetailPreview';
import AlertMessage from '../../../Components/Alert/AlertMessage';
import Button from '../../../Components/Button/Button';
import Container from '../../../Components/Container/Container';

function CreateQuestion() {
  const history = useHistory();

  const username = useSelector((state) => state.user.username);
  const uid = useSelector((state) => state.user.uid);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const { createQuestion, loadingCreateQuestion, errorCreateQuestion } = useCreateQuestion(uid);

  const [ questionEditorState, setQuestionEditorState ] = useState(EditorState.createEmpty());
  const [codeEditorState, setCodeEditorState] = useState(EditorState.createEmpty());

  const addTagHandler = (tag) => {
    setTags((prev) => [...prev, { tag }]);
  };

  const removeTagHandler = (removedTag) => {
    setTags((prev) => prev.filter(({ tag }) => tag !== removedTag));
  };

  const handleClose = () => {
    setSubmitted(false);
  };

  const questionEditorChangeHandler = (editorState) => {
    setQuestionEditorState(editorState);
  };

  const codeEditorChangeHandler = (editorState) => {
    setCodeEditorState(editorState);
  };

  const questionMarkdownState = draftjsToMd(
    convertToRaw(questionEditorState.getCurrentContent())
  );

  const codeMarkdownState = draftjsToMd(
    convertToRaw(codeEditorState.getCurrentContent())
  );

  const backHandler = () => {
    history.push('/forum');
  };

  const submitHandler = () => {
    const questionObject = {
      user_id: uid,
      username: username,
      title: title,
      question: draftjsToMd(convertToRaw(questionEditorState.getCurrentContent())),
      code: draftjsToMd(convertToRaw(codeEditorState.getCurrentContent())),
      timestamp: date.format(new Date(), "MM-DD-YYYY"),
      tags: {
        data: tags,
      },
    };
    createQuestion({
      variables: {
        object: questionObject,
      },
    });
    resetInput();
    setSubmitted(true);
  };

  const resetInput = () => {
    setTags([]);
    setTitle("");
    setQuestionEditorState(EditorState.createEmpty());
    setCodeEditorState(EditorState.createEmpty());
  };

  return (
    <Container className={classes.contain}>
      {loadingCreateQuestion && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress
            style={{
              width: "200px",
              height: "200px",
              color: "#333533",
              margin: "20px auto",
            }}
          />
        </Box>
      )}
      {!loadingCreateQuestion && (
        <>
          <h2>Ask your Question</h2>
          <TitleInputCard value={title} onChange={setTitle} />
          <TagInputCard tags={tags} addTag={addTagHandler} removeTag={removeTagHandler} />
          <QuestionInputCard editorState={questionEditorState} onChangeEditorState={questionEditorChangeHandler}/>
          <CodeInputCard editorState={codeEditorState} onChangeEditorState={codeEditorChangeHandler} />
          <QuestionDetailPreview code={codeMarkdownState} question={questionMarkdownState} />
          <div className={classes.btnWrapper}>
            <Button onClick={backHandler} theme="light">Cancel</Button>
            <Button onClick={submitHandler} theme="dark">Ask</Button>
          </div>
        </>
      )}
      <AlertMessage 
         show={submitted && !errorCreateQuestion && !loadingCreateQuestion}
         message="Succesfully create question."
         type="success"
         onClose={handleClose}
      />
      <AlertMessage
        show={submitted && errorCreateQuestion && !loadingCreateQuestion}
        message="Something went wrong."
        type="error"
        onClose={handleClose}
      />
    </Container>
  )
}

export default CreateQuestion