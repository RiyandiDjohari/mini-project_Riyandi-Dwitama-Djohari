import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../Components/PrivateRoute/PrivateRoute';
import CreateQuestion from './CreateQuestion/CreateQuestion';
import MainForum from './MainForum';
import QuestionDetail from './QuestionDetail';

function Forum() {
  return (
    <Switch>
      <Route path="/forum" exact component={MainForum} />
      <PrivateRoute path="/forum/detail/:id" exact component={QuestionDetail} />
      <PrivateRoute path="/forum/ask" exact component={CreateQuestion} />
    </Switch>
  )
}

export default Forum