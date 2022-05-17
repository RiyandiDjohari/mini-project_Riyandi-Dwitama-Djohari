import React from 'react'
import { useHistory } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Card from '../../Components/Card/Card'
import Markdown from '../../Components/Markdown/Markdown';
import Tag from '../../Components/Tag/Tag';
import TagContainer from '../../Components/Tag/TagContainer';
import classes from "./MyQuestion.module.css"

function MyQuestion({ questionData, deleteQuestion }) {
  const history = useHistory();
  const { code, title, id, question, tags } = questionData;
  const editHandler = () => {
    history.push({pathname: `/edit-question/${id}`, state: {data: questionData}})
  };
  const deleteHandler = () => {
    deleteQuestion(id)
  };
  const detailHandler = () => {
    history.push(`/forum/detail/${id}`);
  };
  
  return (
    <Card>
      <div className={classes.contain}>
        <h3>{title}</h3>
        <div className={classes.line}></div>
        <Markdown str={question}/>
        <Markdown str={code}/>
        <TagContainer>
          {tags.map(({ id, tag }) => {
            return <Tag key={id} text={tag} />;
          })}
        </TagContainer>
        <div className={classes.actionWrapper}>
          <div className={classes.btnWrapper}>
            <Button theme="light" onClick={editHandler} >
              Edit
            </Button>
            <Button theme="dark" onClick={deleteHandler}>
              Delete
            </Button>
          </div>
          <Button theme="light" onClick={detailHandler}>
            Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default MyQuestion