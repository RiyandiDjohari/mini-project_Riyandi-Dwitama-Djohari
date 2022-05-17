import classes from "./ComingSoon.module.css" 
import React from 'react'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Button from '../../Components/Button/Button'
import Card from '../../Components/Card/Card'
import Container from '../../Components/Container/Container'

function ComingSoon({name}) {
  return (
    <Container>
      <Card className={classes.contain}>
        <h2>COMING SOON</h2>
        <div className={classes.line}></div>
        <p>We're currently working on creating our {name} page. We'll be launchin soon, subscribe to be notified</p>
        <div className={classes.btnWrapper}>
          <input type="email" placeholder='Enter email address...'/>
          <Button className={classes.btn} theme="dark">
            <NotificationsActiveIcon style={{marginRight: "10px"}} className={classes.btnIcon}/>
            Notify Me
          </Button>
        </div>
      </Card>
    </Container>
  )
}

export default ComingSoon