import React, { useState } from 'react'
import classes from "./QuestionDetailCard.module.css"
import Card from '../../Components/Card/Card'
import CommentList from '../../Components/Comment/CommentList'
import Markdown from '../../Components/Markdown/Markdown'
import Tag from '../../Components/Tag/Tag'
import TagContainer from '../../Components/Tag/TagContainer'
import { useSelector } from 'react-redux'
import { useSubmitQuestionComment } from '../../Hooks/useSubmitQuestionComment'
import CommentButton from '../../Components/Button/CommentButton'
import CommentForm from '../../Components/Comment/CommentForm'

function QuestionDetailCard({data}) {
  const [commentState, setCommentState] = useState(false);
  const username = useSelector((state) => state.user.username);
  const uid = useSelector((state) => state.user.uid);
  const {title, code, question, tags, question_comments, id, timestamp } = data;
  const { submitComment, loadingSubmitComment, errorSubmitComment } = useSubmitQuestionComment();

  const submitHandler = (comment) => {
    submitComment({
      variables: {
        object: {
          author: username,
          comment: comment,
          question_id: id,
          user_id: uid,
        },
      },
    });
  };

  return (
    <Card>
      <div className={classes.contain}>
        <h3>{title}</h3>
        <div className={classes.line}></div>
        <Markdown str={question}/>
        <Markdown str={code}/>
        <TagContainer>
          {tags.map((tag) => {
              return <Tag key={tag.id} text={tag.tag} />;
          })}
        </TagContainer>
        <CommentList comments={question_comments} />
        {!commentState && (
          <div className={classes.bottomWrapper}>
            <CommentButton onClick={() => setCommentState(true)}/>
            <p>{timestamp}</p>
          </div>
        )}
        {commentState && (
          <CommentForm 
            onCancel={() => setCommentState(false)}
            error={errorSubmitComment}
            loading={loadingSubmitComment}
            onSubmit={submitHandler}
          />
        )}
      </div>
    </Card>
  )
}

export default QuestionDetailCard