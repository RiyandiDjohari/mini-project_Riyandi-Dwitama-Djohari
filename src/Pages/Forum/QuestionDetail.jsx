import classes from "./QuestionDetail.module.css";
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { draftjsToMd } from "draftjs-md-converter"
import { convertToRaw } from 'draft-js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSubmitAnswer } from '../../Hooks/useSubmitAnswer';
import { useSubscribeQuestionDetail } from "../../Hooks/useSubscribeQuestionDetail";
import { CircularProgress } from '@mui/material';
// Components
import Answer from './Answer';
import QuestionDetailCard from './QuestionDetailCard';
import LoadingQuestionDetail from '../../Components/Loading/LoadingQuestionDetail';
import Container from '../../Components/Container/Container';
import Card from '../../Components/Card/Card';
import TextEditor from '../../Components/Editor/TextEditor';
import Markdown from '../../Components/Markdown/Markdown';
import Button from '../../Components/Button/Button';

function QuestionDetail() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  let markDownState = draftjsToMd(
    convertToRaw(editorState.getCurrentContent())
  )
  const { id } = useParams();
  const username = useSelector((state) => state.user.username);
  const uid = useSelector((state) => state.user.uid);
  const { submitAnswer, loadingSubmitAnswer, errorSubmitAnswer } = useSubmitAnswer(id)
  const { questionData, loadingQuestionData, errorQuestionData } = useSubscribeQuestionDetail(id)
  const editorStateChangeHandler = (editorState) => {
    setEditorState(editorState);
  }
  if(loadingQuestionData) {
    return <LoadingQuestionDetail />
  }
  if(errorQuestionData) {
    return <p>Error</p>;
  }

  const {answers, ...data} = questionData.question_by_pk;

  const submitHandler = () => {
    const answerObject = {
      user_id : uid,
      author :username,
      question_id : id,
      answer: markDownState,
    };
    submitAnswer({
      variables: {
        object: answerObject,
      }
    });
    setEditorState(EditorState.createEmpty());
  }

  return (
    <Container>
      <div className={classes.contain}>
        <h2>Question</h2>
        <QuestionDetailCard data={data} />
      </div>
      <div className={classes.answerContain}>
        {answers.length > 1 ? (
          <h2>{answers.length} Answers</h2>
          ) : (
          <h2>{answers.length} Answer</h2>
        )}
        {answers.map((answer) => {
          return(
            <Answer 
              key={answer.id}
              id={answer.id}
              str={answer.answer}
              comments={answer.answer_comments}
            />
          );
        })}
      </div>
      {loadingSubmitAnswer && (
        <Card className={classes.spinnerContain}>
          <CircularProgress className={classes.spinner}/>
        </Card>
      )}
      {!loadingSubmitAnswer && (
        <>
          <div className={classes.editorContain}>
            <h2>Type your answer here</h2>
            <TextEditor 
              editorState={editorState}
              onChange={editorStateChangeHandler}
            />
          </div>
          <div className={classes.previewContain}>
            <h2 style={{marginTop:"10px"}}>Your answer preview</h2>
            <Card className={classes.card}>
              <Markdown str={markDownState} />
            </Card>
          </div>
          <p>{errorSubmitAnswer && errorSubmitAnswer.message}</p>
          <div className={classes.btnContain}>
            <Button theme="light">Cancel</Button>
            <Button theme="dark" onClick={submitHandler}>Answer</Button>
          </div>
        </>
      )}
    </Container>
  )
}

export default QuestionDetail