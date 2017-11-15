import React, { Component } from 'react';
import './App.css';
import ToDoListSelector from './to-do-list-selector'
import ToDoList from './to-do-list'
import { Switch, Route } from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' component={ToDoListSelector}/>
          <Route exact path='/lists' component={ToDoListSelector}/>
          <Route exact path='/list' component={ToDoList} />
          <Route path='/list/:listId' component={ToDoList}/>
        </Switch>
      </div>
    );
  }
}

export default App;
