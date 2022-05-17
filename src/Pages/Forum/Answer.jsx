import classes from "./Answer.module.css";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSubmitAnswerComment } from '../../Hooks/useSubmitAnswerComment';
// Components
import Card from '../../Components/Card/Card';
import CommentButton from '../../Components/Button/CommentButton';
import CommentForm from '../../Components/Comment/CommentForm';
import CommentList from '../../Components/Comment/CommentList';
import Markdown from '../../Components/Markdown/Markdown';

function Answer({ str, comments, id}) {
  const [commentState, setCommentState] = useState(false);
  const { submitComment, loadingSubmitComment, errorSubmitComment } = useSubmitAnswerComment();
  const username = useSelector((state) => state.user.username);
  const uid = useSelector((state) => state.user.uid);
  const { id: questionId } = useParams();

  const submitHandler = (comment) => {
    submitComment({
      variables: {
        object: {
          author: username,
          user_id: uid,
          comment: comment,
          answer_id: id,
          question_id: questionId,
        }
      }
    })
  };
  
  return (
    <Card className={classes.contain}>
      <Markdown str={str} />
      <CommentList comments={comments} />
      {!commentState && (
        <CommentButton onClick={() => setCommentState(true)}/>
      )}
      {commentState && (
        <CommentForm 
          onCancel={() => setCommentState(false)}
          onSubmit={submitHandler}
          error={errorSubmitComment}
          loading={loadingSubmitComment}
        />
      )}
    </Card>
  );
};

export default Answer;