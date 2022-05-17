import React, { useState } from 'react'
import AlertMessage from '../../Components/Alert/AlertMessage'
import Button from '../../Components/Button/Button'
import Card from '../../Components/Card/Card'
import Container from '../../Components/Container/Container'
import FormControl from '../../Components/FormControl/FormControl'
import classes from "./Contact.module.css";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const closeHandler = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  };

  return (
    <Container>
      <Card className={classes.contain}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <FormControl value={name} onChange={(e) => setName(e.target.value)} type="text" label="Name"/>
          <FormControl value={email} onChange={(e) => setEmail(e.target.value)} type="email" label="Email"/>
          <FormControl value={message} onChange={(e) => setMessage(e.target.value)} type="textarea" label="Message"/>
          <Button theme="dark" className={classes.btn}>Send</Button>

        </form>
      </Card>
      <AlertMessage 
        message="Data Submitted"
        onClose={closeHandler}
        show={submitted}
        type="success"
      />
      <AlertMessage 
        message="Something went wrong"
        onClose={closeHandler}
        show={submitted && (!name|| !email || !message)}
        type="error"
      />
    </Container>
  )
}

export default Contact