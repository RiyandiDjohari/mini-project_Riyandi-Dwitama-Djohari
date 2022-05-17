import React, { useState } from "react";
import classes from "./UserHeader.module.css";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProfileDropdown from "../HoverDropDown/ProfileDropdown";

function UserHeader() {
  const [showDropDown, setShowDropDown] = useState(false);
  const url = useSelector((state) => state.user.profilePicture);
  const username = useSelector((state) => state.user.username);

  const openHandler = () => {
    setShowDropDown(true);
  };

  const closeHandler = () => {
    setShowDropDown(false);
  };

  return (
    <>
      <div onMouseOver={openHandler} onMouseLeave={closeHandler} className={classes.profileBadge}>
        {!url && <Avatar style={{ backgroundColor: "#333533" }} className={classes.avatar} sx={{width: 35, height: 35}}/> }
        {url && <img src={url} alt="profile-pict" />}
        <div className={classes.displayName}>
          <h3>{username}</h3>
        </div>
        <ArrowDropDownIcon className={classes.dropdown} />
        {showDropDown && <ProfileDropdown />}
      </div>
    </>
  );
}

export default UserHeader;
