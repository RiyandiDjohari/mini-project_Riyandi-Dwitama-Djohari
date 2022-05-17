import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import classes from "./Navigation.module.css";
import UserHeader from "./UserHeader";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Navigation() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className={classes.nav}>
      <div className={classes.top}>

        <div className={classes.topLeft}>
          <h4 className={classes.topTitle}>ForumCare</h4>
        </div>
        
        <div className={classes.topCenter}>
          <ul className={isMobile ? `${classes.listMobile}` : `${classes.list}` } onClick={() => setIsMobile(false)}>
            <li>
              <NavLink exact activeClassName={classes.active} to="/">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/blog">
                BLOGS
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/forum">
                FORUM
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/contact">
                CONTACT
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/about">
                ABOUT
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={isMobile ? `${classes.listMobileUserHeader}` : `${classes.topRight}` }>{isLogin ? <UserHeader /> : <LoginHeader />}</div>
        <button className={classes.mobileMenuIcon} onClick={() => setIsMobile(!isMobile)} >
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </div>
  );
}

export default Navigation;
