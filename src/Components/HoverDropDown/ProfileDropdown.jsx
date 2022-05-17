import React from "react";
import classes from "./ProfileDropdown.module.css";
// React-router-dom
import { NavLink, useHistory } from "react-router-dom";
// React-redux
import { useDispatch } from "react-redux";
import { logout } from "../../Store/userSlice";
// Firebase Auth
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
// Icons
import PersonIcon from "@mui/icons-material/Person";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LogoutIcon from "@mui/icons-material/Logout";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

function ProfileDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
    history.push("/");
  };
  return (
    <ul className={classes.dropdown}>
      <li className={classes.title}>Menu</li>
      <li>
        <NavLink to="/profile">
          <button>
            <PersonIcon />
            Profile
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/user-question">
          <button>
            <LiveHelpIcon />
            Question
          </button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/user-blog">
          <button>
            <LibraryBooksIcon />
            Blogs
          </button>
        </NavLink>
      </li>
      <li>
        <button onClick={logoutHandler}>
          <LogoutIcon />
          Logout
        </button>
      </li>
    </ul>
  );
}

export default ProfileDropdown;
