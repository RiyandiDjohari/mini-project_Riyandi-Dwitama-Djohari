import React from "react";
import { footerData } from "./footerData";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.footer}>
      <h4 className={classes.logo}>ForumCare</h4>
      {footerData.map((data, i) => {
        return (
          <div key={i} className={classes.productWrapper}>
            <h4>{data.title}</h4>
            {data.items.map(({ Icon, item }, i) => {
              return (
                <p key={i}>
                  {Icon && <Icon/>}
                  {item}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Footer;
