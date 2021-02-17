import React, { Component } from 'react';
import './style.css';
import { saveStateToLocalStorage, hydrateStateWithLocalStorage } from './server/server';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItem: '',
            list: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    //incorporating local storage 
    componentDidMount() {
        hydrateStateWithLocalStorage(this);

        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            saveStateToLocalStorage.bind(this)
        );
    }
    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        saveStateToLocalStorage(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    updateInput(input, value) {
        this.setState({
            [input]: value,
        })
    }
    addItem() {
        //creates item with unique id
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()
        }
        // concat the original list 
        const list = [...this.state.list];

        //add the new item to the list
        list.push(newItem);

        //update the original list
        this.setState({
            list: list,
            newItem: "",
        });
    }
    deleteItem(id) {
        //copy list
        const list = [...this.state.list];

        const updatedList = list.filter(item => item.id !== id);

        // update list
        this.setState({
            list: updatedList,
        })
    }

    render() {
        return (
            
            <div>
                
                 <title>To Do List </title>
                 <h1 className="app-title"> My List</h1>
            <form className="container" onSubmit={this.handleSubmit}
                style={{
                    padding: 30,
                    textAlign: "left",
                    maxWidth: 500,
                    margin: "auto"
                }}
                >
                <label >
                   
                   

            Add an item...
                <br />
                    <input type="text"
                        placeholder="Item name"
                        value={this.state.newItem}
                        onChange={e => this.updateInput("newItem", e.target.value)}
                        />
                    <button
                        className="btn btn-floating"
                        onClick={() => this.addItem()}
                        >
                           <i class="material-icons"> Add </i>
                  </button>
                    <br />
                    <ul>
                        {this.state.list.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.value}
                                    <button  className="btn add-btn btn-floating"
                                    onClick={() => this.deleteItem(item.id)}
                                    > <i class="material-icons">X</i></button>
                                </li>
                            )
                        })}
                    </ul>
                </label>

            </form>
                        </div>
        );
    }
}
export default App;