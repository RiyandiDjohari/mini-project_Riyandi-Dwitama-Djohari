import classes from "./MainForum.module.css";
import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
import { BorderAllOutlined, Help, Search } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
// import { GetAllQuestion } from '../../GraphQL/query';
import { useGetQuestionByTag } from "../../Hooks/useGetQuestionByTag";
import QuestionCard from './QuestionCard';
import Button from '../../Components/Button/Button';
import Container from '../../Components/Container/Container';
import Card from '../../Components/Card/Card';
import LoadingQuestionCard from "../../Components/Loading/LoadingQuestionCard"
import { useSubscribeQuestion } from "../../Hooks/useSubscribeQuestions";

function MainForum() {
  const {data, loading, error} = useSubscribeQuestion();
  const { getQuestionByTag, questionByTag, errorQuestionByTag, loadingQuestionByTag } = useGetQuestionByTag()
  const [tag, setTag] = useState("");
  const [mode, setMode] = useState("all");
  const history = useHistory();

  const createQuestionHandler = () => {
    history.push("/forum/ask");
  };

  const searchHandler = () => {
    if(tag.trim().length === 0) return;
    getQuestionByTag({
      variables: {
        tag: tag
      }
    })
    setMode("search");
  };

  if(error || errorQuestionByTag) {
    return <p>{error}</p>
  };

  const showedData = mode === "all" ? data : questionByTag;
  const isLoading = loading || loadingQuestionByTag;

  return (
    <Container>
      <div className={classes.containCenter}>
        <div className={classes.topLeft}>
          <h2>Ask and Answer</h2>
          <p>
            Place where you can ask anything and get clear answer from the experienced one.
          </p>
        </div>
        <div className={classes.topRight}>
          <Button
            onClick={createQuestionHandler}
            theme="light"
            className={classes.btn}
          >
            <Help/> Ask a question 
          </Button>
        </div>
      </div>
      <div className={classes.containTop}>
        <Button 
          className={classes.showAllBtn}
          theme="light"
          onClick={() => setMode("all")}
        >
          <BorderAllOutlined/>
          Show All
        </Button>
        <div className={classes.search}>
          <p>Search by tag</p>
          <div className={classes.inputWrapper}>
            <div className={classes.input}>
              <span className={classes.pgr}>#</span>
              <input 
                type="text"
                onChange={(e) => setTag(e.target.value)}
                value={tag}
                placeholder="i.e react"
              />
            </div>
            <div>
              <Button onClick={searchHandler} className={classes.searchBtn} theme="light">
                <Search/>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && 
        [1, 2, 3].map((i) => {
          return(
            <div key={i} className={classes.mb}>
              <LoadingQuestionCard />
            </div>
          );
        })
      }
      {!isLoading && (
        <div className={classes.questionContainer}>
          {showedData?.question.length === 0 && (
            <Card className={classes.noQuestion}>
              <p>There is no question.</p>
            </Card>
          )}
          {showedData?.question.map((q) => {
            return(
              <QuestionCard 
                key={q.id}
                id={q.id}
                author={q.username}
                title={q.title}
                content={q.question}
                answer={q.answers.length}
                tags={q.tags}
                timestamp={q.timestamp}
              />
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default MainForum