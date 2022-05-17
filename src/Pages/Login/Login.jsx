import React, { useState } from "react";
import classes from "./Login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Component
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import Container from "../../Components/Container/Container";
import CenteredSpinner from "../../Components/Loading/CenteredSpinner";
import FormControl from "../../Components/FormControl/FormControl";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { login } from "../../Store/userSlice";
import { auth } from "../../Firebase/firebase";
import { NavLink } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = useSelector((state) => state.user.isLogin);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(isLogin)
  if (isLogin) {
    history.replace("/forum");
  }

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            username: userAuth.user.displayName,
            uid: userAuth.user.uid,
            profilePictureUrl: userAuth.user.photoURL,
          })
        );
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };
  
  return (
    <Container>
      <Card className={classes.contain}>
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <FormControl value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" />
          <FormControl value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" />
          {loading && <CenteredSpinner />}
          {!loading && (
            <Button className={classes.btn} theme="dark">
              Login
            </Button>
          )}
          <NavLink to="/register" className="text-decoration-none">
            <h4 className="text-dark my-4 text-center">New user ? Click here...</h4>
          </NavLink>
        </form>
      </Card>
    </Container>
  );
}

export default Login;
