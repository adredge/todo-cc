import React, { Component } from 'react';
import Client from "./Client";
import './to-do-list.css';

class ToDoListSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [{
        _id: "",
        name: ""
      }],
      createListName: ""
    };
  }

  componentWillMount() {
    Client.getLists()
      .then((userLists) => {
        this.setState({
          lists: userLists.lists
        })
      })
  }

  renderListNames = () => {
    console.log('lists', this.state.lists)
    if (!this.state.lists || this.state.lists.length <= 0) return
    return this.state.lists.map(list => <li key={list._id} onClick={() => this.selectList(list._id)}>{list.name}</li>)
  }

  selectList = (listId) => {
    console.log("selecting list", listId)
  }

  // renderListItems = () => {
  //   if (!this.state.list || !this.state.list.items || this.state.list.items.length === 0) return
  //   return this.state.list.items.map(item => <ListItem key={item._id} item={item} removeItem={this.removeItem} />)
  // }

  // removeItem = (itemId) => {
  //   Client.removeItem(this.state.list._id, itemId)
  //     .then(() => {
  //       this.setState({
  //         list: { ...this.state.list, items: this.state.list.items.filter(e => e._id !== itemId) }
  //       })
  //     })
  // }

  createList = () => {
    Client.createList(this.state.createListName)
      .then(() => console.log('created list; redirecting to that list'))
  }

  handleChange = (event) => {
    this.setState({ createListName: event.target.value });
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.createList()
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          Your Lists
        </div>

        <div>
          <ul className="lists">
            {this.renderListNames()}
          </ul>
          <div className="create-list">
            <input type="text" className="create-list-input" name="create-list-input"
              placeholder="Create new list..." value={this.state.createListName} onChange={this.handleChange} onKeyPress={this.onKeyPress} />
            <button className="create-list-button" onClick={this.createList}>Create List</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoListSelector;
