import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import UserCreate from './components/treatment_record';

export default function App() {
  return (
    <Router>
    <div>
      <UserCreate />
      <Switch>

        <Route exact path="/create" component={UserCreate} />
      </Switch>
    </div> 
    </Router>
  );
}

