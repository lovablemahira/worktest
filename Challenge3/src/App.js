import React, { Component } from "react";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      newTask:"",
      list:[]
    }
  }

//incorporating local storage 
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    //Update react state
    this.setState({
      [key]: value
    });
  }
  completeTask(id) {
    //Copy current tasks
    const list = [...this.state.list];

    //Add to completed tasks
    const listDone = [...this.state.listDone];
    listDone.push(list.filter(task => task.id !== id));
    this.setState({list});

    //Delete from current tasks
    this.deleteTask(task => task.id);
  }
  addTask() {
    //Create task with unique id
    const newTask={
      id: 1 + Math.random(),
      value: this.state.newTask.slice()
    };

    //Copy current tasks
    const list = [...this.state.list];

    //Add new task
    list.push(newTask);

    //Update list and reset
    this.setState({
      list,
      newTask:""
    });
  }
  deleteTask(id){
    //Copy current tasks
    const list = [...this.state.list];

    //Remove task
    const updateList = list.filter(task => task.id !== id);

    this.setState({list: updateList});
  }

  render() {
    return (
      <div class="body">
      <div>
      <strong><h>Task Manager</h></strong>
        <input
          type="text"
          placeholder="Type task here"
          value={this.state.newTask}
          onChange={e => this.updateInput("newTask", e.target.value)}
         />
        <button
          onClick={()  => this.addTask()}
        >
          +
        </button>
        </div>
      <div class="container">
        <ul>
          {this.state.list.map(task => {
            return(
              <li key={task.id}>
                {task.value}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  onClick={() => this.deleteTask(task.id)}
                >
                -
                </button>
              </li>

            )
          })}
        </ul>
      </div>
      </div>
    );
  }
}

export default App;