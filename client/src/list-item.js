import React, { Component } from 'react';
import Client from "./Client";
import './list-item.css';

class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: props.item,
            showRemoveButton: false
        };
    }

    uncheckItem = () => {
        Client.uncheckItem(this.state.item._id)
        .then(() => {
            this.setState({item: {...this.state.item, complete: false, completedAt: null}})
        })
    }

    checkItem = () => {
        const completedAt = new Date().toLocaleString()
        Client.checkItem(this.state.item._id, completedAt)
         .then(() => {
            this.setState({item: {...this.state.item, complete: true, completedAt}})
        })
    }
    
    handleCheck = () => {
        if(this.state.item.complete) this.uncheckItem()
        else this.checkItem()
    }

    renderCompletedDetails = (item) => {
        if(item.complete) {
            return (<div className="completedAt">
                        Completed {new Date(item.completedAt).toLocaleString()}
                    </div>)
        }
        return;
    }

    showRemoveButton = () => {this.setState({showRemoveButton: true})}
    hideRemoveButton = () => {this.setState({showRemoveButton: false})}
    
    render() {

        const item = this.state.item;

        return (
            <li className="item" {...this.props.children} onMouseEnter={this.showRemoveButton} onMouseLeave={this.hideRemoveButton}>
                <div className="itemContent">
                    <input type="checkbox" 
                        className="listCheckbox"
                        name={item._id} 
                        checked={item.complete} 
                        onChange={this.handleCheck}/>
                    <div className="displayText">
                        <div>
                            {item.name}
                        </div>
                        {this.renderCompletedDetails(item)}
                    </div>
                    {this.state.showRemoveButton ? <button className="removeButton" onClick={() => this.props.removeItem(this.state.item._id)}>X</button> : null }
                </div>
            </li>
        );
    }
}

export default ListItem;
