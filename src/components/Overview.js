import { useState } from "react";
import uniqid from "uniqid";

function Overview() {
  const [tasks, setTask] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    setTask([
      ...tasks,
      {
        id: uniqid(),
        number: tasks.length,
        value: e.target.taskInput.value,
        onedit: false
      }
    ]);
    e.target.reset();
    e.target.taskInput.focus();
  };

  const onDelete = (e) => {
    const id = e.target.id;
    const newTasks = tasks.filter((task) => task.id !== id);
    setTask(newTasks.map((task, index) => {
      return  {
                id: task.id,
                number: index,
                value: task.value,
                onedit: task.onedit
              }
    }));
  };

  const onEdit = (e) => {
    const id = e.target.id;
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
                id: task.id,
                number: task.number,
                value: task.value,
                onedit: true
               }
      } else {
        return task;
      }
    });
    setTask(newTasks);
  };

  const onEditDone = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
                id: task.id,
                number: task.number,
                value: e.target.taskOnChangeInput.value || task.value,
                onedit: false
              }
      } else {
        return task;
      }
    });
    setTask(newTasks);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Please enter task:
          <input
            type="text"
            id="taskInput"
          />
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>
      <br />
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.onedit
              ? <form id={task.id} onSubmit={onEditDone}>
                  <input
                    placeholder={task.value}
                    id="taskOnChangeInput"
                  />
                  <br />
                  <button type="submit">Done</button>
                </form>
              : <div>
                  <p>Task {task.number}: {task.value}</p>
                  <button
                    id={task.id}
                    onClick={onEdit}>
                    Edit
                  </button>
                </div>
            }
            <button 
              id={task.id}
              onClick={onDelete}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Overview };