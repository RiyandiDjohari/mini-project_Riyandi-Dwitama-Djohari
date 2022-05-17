import classes from "./QuestionCard.module.css"
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Forum } from '@mui/icons-material'
// Components
import Button from '../../Components/Button/Button'
import Card from '../../Components/Card/Card'
import Markdown from '../../Components/Markdown/Markdown'
import Tag from '../../Components/Tag/Tag'
import TagContainer from '../../Components/Tag/TagContainer'

function QuestionCard({id, author, title, content, tags, answer, timestamp}) {
  const history = useHistory();
  const detailClickHandler = () => {
    history.push(`/forum/detail/${id}`);
  }
  return (
    <Card className={classes.card}>
      <div className={classes.headWrapper}>
        <h3>{title}</h3>
        <div className={classes.nameStampWrapper}>
          <p className={classes.prag}>Created by</p>
          <p className={classes.author}>{author}</p>
        </div>
      </div>
      <div className={classes.line}></div>
      <div className={classes.padd}>
        <div className={classes.flexWrapper}>
          <div className={classes.question}>
            <Markdown str={content} />
          </div>
          <div  className={classes.forumIconWrapper}>
            <Forum fontSize='large' className={classes.forumIcon}/>
            {answer > 1 ? (
              <p>{answer} answers</p>
              ) : (
              <p>{answer} answer</p>
            )}
          </div>
        </div>
        <TagContainer>
          {tags.map((tag) => {
            return <Tag key={tag.id} text={tag.tag}/>
          })}
        </TagContainer>
        <div className={classes.btnWrapper}>
          <Button onClick={() => detailClickHandler()} className={classes.btn} theme="dark">
            Details
          </Button>
          <p>{timestamp}</p>
        </div>
      </div>
    </Card>
  )
}

export default QuestionCard