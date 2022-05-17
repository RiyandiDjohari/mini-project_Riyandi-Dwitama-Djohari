import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Home.module.css";
import React from "react";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import BannerCard from "./BannerCard";
import { bannerData } from "./data";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function Home() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const history = useHistory();

  const clickHandler = () => {
    if (isLogin) {
      history.push("/forum");
    } else {
      history.push("/register");
    }
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.jumbotron}>
          <div className={classes.jumbotronLeft}>
            <h2>Join Our Community</h2>
            <p>Ask or answer some question, help other by writing blogs. Discover stories, thinking, and expertise from writers on any topics. </p>
            <Button onClick={clickHandler} className={classes.btn} theme="light">
              Get Started
            </Button>
          </div>
          <div className={classes.jumbotronRight}>
            <img src={require("./casual-life-3d.png")} alt="jumbotron-img" width="600px"/>
          </div>
        </div>
      </div>

      <Container>
        <h1 className={classes.contentTitle}>Our Key Features</h1>
        <div className={classes.flex}>
          {bannerData.map((data, i) => {
            return <BannerCard key={i} title={data.title} content={data.content} action={data.action} link={data.link} />;
          })}
        </div>
      </Container>
    </>
  );
}

export default Home;
