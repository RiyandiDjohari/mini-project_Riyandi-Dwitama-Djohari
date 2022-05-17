import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./Store/userSlice";
import { Switch, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase";
import { CircularProgress } from "@mui/material";
// Component
import Footer from "./Components/Footer/Footer";
import Navigation from "./Components/Navigation/Navigation";
import PublicRoute from "./Components/PrivateRoute/PublicRoute";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
// Pages
import Blog from "./Pages/Blog/Blog";
import BlogList from "./Pages/Profile/BlogList";
import Forum from "./Pages/Forum/Forum";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import QuestionList from "./Pages/Profile/QuestionList";
import EditQuestion from "./Pages/Profile/EditQuestion";
import Contact from "./Pages/Contact/Contact";
import ComingSoon from "./Pages/ComingSoon/ComingSoon";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubs = onAuthStateChanged(
      auth,
      (userAuth) => {
        if (userAuth !== null) {
          dispatch(
            login({
              username: userAuth.displayName,
              uid: userAuth.uid,
              profilePictureUrl: userAuth.photoURL,
            })
          );
          setLoading(false);
        } else {
          dispatch(logout());
          setLoading(false);
        }
      },
      (error) => {
        alert(error);
        setLoading(false);
      }
    );
    return () => unsubs;
  }, [dispatch]);

  return (
    <div className="App">
      {loading && (
        <div className="spinner-contain">
          <CircularProgress style={{ width: "200px", height: "200px", color: "#333533" }} />
        </div>
      )}
      {!loading && (
        <>
          <Navigation />
          <ScrollToTop />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/blog" component={Blog} />
            <Route path="/forum" component={Forum} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={ComingSoon}/>
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute path="/profile" component={ComingSoon}/>
            <PrivateRoute path="/user-blog" component={BlogList} />
            <PrivateRoute path="/user-question" component={QuestionList} />
            <PrivateRoute path="/edit-question/:questionId" component={EditQuestion} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
