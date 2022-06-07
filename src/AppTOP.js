import React, { Component } from "react";
import uniqid from "uniqid";
import Overview from "./components/Overview";

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: { 
        text: '',
        id: uniqid(),
        number: '',
        editOn: false,
      },
      tasks: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitTask = this.onSubmitTask.bind(this);
  };

  handleChange = (e) => {
    this.setState({
      task: {
        text: e.target.value,
        id: this.state.task.id,
        number: this.state.tasks.length,
        editOn: this.state.task.editOn,
      },
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        text: '',
        id: uniqid(),
        number: '',
        editOn: false,
      },
    });
  };

  onDeleteTask = (e) => {
    const id = e.target.id;
    const newTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: newTasks.map((task, index) => {
        return {
          text: task.text,
          id: task.id,
          number: index,
          editOn: task.editOn,
        };
      }),
    });
  };

  onEditTask = (e) => {
    const id = e.target.id;
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.id === id) {
          return {
            text: task.text,
            id: task.id,
            number: task.number,
            editOn: true,
          };
        } else {
          return task;
        };
      }),
    });
  };

  onEditDoneTask = (e) => {
    console.log('edit done');
    e.preventDefault();
    const id = e.target.id;
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.id === id) {
          return {
            text: e.target.taskInput.value || task.text,
            id: task.id,
            number: task.number,
            editOn: false,
          };
        } else {
          return task;
        };
      }),
    });
  };

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input 
            onChange={this.handleChange}
            value={task.text}
            type="text"
            id="taskInput"
          />
          <button type="submit">
            Add Task
          </button>
        </form>
        <Overview 
          tasks={tasks}
          handleDelete={this.onDeleteTask}
          handleEdit={this.onEditTask}
          handleEditDone={this.onEditDoneTask}
        />
      </div>
    );
  };
};

export default App;
