import React, { Component } from 'react';
import './App.css';
import ToDoListSelector from './to-do-list-selector'

class App extends Component {

  render() {
    return (
      <div className="app">
        <ToDoListSelector />
        {/* <ToDoList /> */}
      </div>
    );
  }
}

export default App;
