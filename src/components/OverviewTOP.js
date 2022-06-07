import React from "react";

function Overview({ tasks, handleDelete, handleEdit, handleEditDone }) {
  // const { tasks, handleDelete } = props;

  const liEditDone = (task) => {
    return (
      <li key={task.id}>
        Task {task.number}: {task.text}
        <button
          onClick={handleEdit}
          id={task.id}>
          edit
        </button>
        <button 
          onClick={handleDelete}
          id={task.id}>
          X
        </button>
      </li>
    );
  };

  const liEditOn = (task) => {
    return (
      <li key={task.id}>
        <form id={task.id} onSubmit={handleEditDone}>
          <label htmlFor="taskInput"></label>
          <input 
            placeholder={task.text}
            type="text"
            id="taskInput" />
          <button type="submit">done</button>
          <button 
            onClick={handleDelete}
            id={task.id}>
            X
          </button>
        </form>
      </li>
    );
  };
  
  return (
    <ul>
      {tasks.map((task) => {
        return task.editOn ? liEditOn(task) : liEditDone(task);
      })}
    </ul>
  );
};

export default Overview;