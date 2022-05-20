import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Container from '../../Components/Container/Container'
import classes from "./QuestionList.module.css";
import { useDeleteQuestion } from '../../Hooks/useDeleteQuestion';
import { Alert } from '@mui/material';
import CenteredSpinner from '../../Components/Loading/CenteredSpinner';
import MyQuestion from './MyQuestion';
import AlertMessage from '../../Components/Alert/AlertMessage';
import LoadingQuestionDetail from '../../Components/Loading/LoadingQuestionDetail';
import Button from '../../Components/Button/Button';
import { Help } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { useSubscribeUserQuestions } from '../../Hooks/useSubscribeUserQuestions';

function QuestionList() {
  const uid = useSelector((state) => state.user.uid);
  const { myQuestions, loadingMyQuestions, errorMyQuestions } = useSubscribeUserQuestions(uid);
  const { deleteQuestion, loadingDeleteQuestion, errorDeleteQuestion } = useDeleteQuestion();
  const [deleted, setDeleted] = useState(false);
  const history = useHistory();

  const deleteHandler = (id) => {
    deleteQuestion({
      variables: {
        id: id,
      }
    });
    setDeleted(true);
  };

  const handleClose = () => {
    setDeleted(false)
  }

  const createQuestionHandler = () => {
    history.push("/forum/ask");
  };
  
  if(loadingMyQuestions) {
    return <LoadingQuestionDetail />;
  }

  return (
    <Container>
      {errorMyQuestions && (
        <Alert severity='error' variant='standard'>
          {errorMyQuestions.message}
        </Alert>
      )}
      {errorDeleteQuestion && (
        <Alert severity='error' variant='standard'>
          {errorDeleteQuestion.message}
        </Alert>
      )}
      <div className={classes.contain}>
        <h2>Your Question</h2>
        <div className={classes.questionsWrapper}>
          {loadingDeleteQuestion && <CenteredSpinner />}
          {!loadingDeleteQuestion && myQuestions.question.length === 0 && (
            <div className={classes.noQuestion}>
              <p>You haven't created a question yet</p>
              <Button
                onClick={createQuestionHandler}
                theme="light"
                className={classes.btn}
                >
                <Help/> Ask a question 
              </Button>
            </div>
          )}
          {!loadingDeleteQuestion && 
            myQuestions.question.map((question) => {
              return(
                <MyQuestion 
                  questionData={question}
                  deleteQuestion={deleteHandler}
                  loadingDelete={loadingDeleteQuestion}
                  key={question.id}
                />
              )
            })
          }
        </div>
      </div>
      <AlertMessage 
        show={deleted && !errorDeleteQuestion && !loadingDeleteQuestion}
        onClose={handleClose}
        message="Succesfully delete question"
        type="success"
      />
      <AlertMessage
        show={deleted && errorDeleteQuestion && !loadingDeleteQuestion}
        onClose={handleClose}
        message="Something went wrong"
        type="error"
      />
    </Container>
  )
}

export default QuestionList