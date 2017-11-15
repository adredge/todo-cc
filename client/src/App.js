import React, { Component } from 'react'
import './App.css'
import Client from "./Client"
import ToDoListSelector from './to-do-list-selector'
import ToDoList from './to-do-list'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAuthed: false
    }
  }

  componentWillMount() {
    Client.authenticateUser().then(() => {
      this.setState({
        hasAuthed: true
      })
    })
  }

  render() {
    let appBody
    if (this.state.hasAuthed) {
      appBody =
        <Switch>
          <Route exact path='/' component={ToDoListSelector} />
          <Route exact path='/lists' component={ToDoListSelector} />
          <Route exact path='/list' component={ToDoList} />
          <Route path='/list/:listId' component={ToDoList} />
        </Switch>
    }

    return (
      <div className="app">
        {appBody}
      </div>
    )
  }
}

export default App
