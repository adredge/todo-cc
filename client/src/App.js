import React, { Component } from 'react';
import './App.css';
import ToDoList from './to-do-list'

class App extends Component {

  render() {
    return (
      <div className="app">
        <ToDoList />
      </div>
    );
  }
}

export default App;
