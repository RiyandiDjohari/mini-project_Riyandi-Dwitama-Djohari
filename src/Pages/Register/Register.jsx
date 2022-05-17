import React, { useState } from "react";
import classes from "./Register.module.css";
import { auth } from "../../Firebase/firebase";
import { Alert } from "@mui/material";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { login } from "../../Store/userSlice";
import { useInsertNewUser } from "../../Hooks/useInsertNewUser";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// Components
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import Container from "../../Components/Container/Container";
import FormControl from "../../Components/FormControl/FormControl";
import CenteredSpinner from "../../Components/Loading/CenteredSpinner";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAuth, setErrorAuth] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const { insertUser, errorInsertUser, loadingInsertUser } = useInsertNewUser();
  const isLoading = loadingAuth || loadingInsertUser;
  const isError = errorInsertUser || errorAuth;
  const dispatch = useDispatch();
  const history = useHistory();

  const registerHandler = (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        }).then(() => {
          insertUser({
            variables: {
              object: {
                username: auth.currentUser.displayName,
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
              },
            },
          });
          dispatch(
            login({
              username: auth.currentUser.displayName,
              uid: auth.currentUser.uid,
              profilePictureUrl: auth.currentUser.photoURL,
            })
          );
          setLoadingAuth(false);
          history.push("/");
        });
      })
      .catch((err) => {
        setLoadingAuth(false);
        setErrorAuth(err);
      });
  };
  
  return (
    <Container>
      <Card className={classes.contain}>
        <h2>Register</h2>
        <form onSubmit={registerHandler}>
          <FormControl value={username} onChange={(e) => setUsername(e.target.value)} label="Username" type="text" />
          <FormControl value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" />
          <FormControl value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" />
          {isLoading && <CenteredSpinner />}
          {!isLoading && (
            <Button className={classes.btn} theme="dark">
              Register
            </Button>
          )}
          {isError && (
            <Alert variant="standard" severity="error" style={{marginTop: "20px"}}>
              Something went wrong, please try again later
            </Alert>
          )}
          <NavLink to="/login" className="text-decoration-none">
            <h4 className="text-dark my-4 text-center">Already have an account ?</h4>
          </NavLink>
        </form>
      </Card>
    </Container>
  );
}

export default Register;
