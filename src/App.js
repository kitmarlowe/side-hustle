import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const loadedTasks = localStorage.getItem('tasks');
    if (loadedTasks) {
      setTasks(JSON.parse(loadedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, isEditing: false }]);
    setTask('');
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, text: newText } : task;
    });
    setTasks(updatedTasks);
  };

  const startEditing = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: true } : task;
    });
    setTasks(updatedTasks);
  };

  const saveEdit = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: false } : task;
    });
    setTasks(updatedTasks);
  };

  const cancelEdit = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: false } : task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <form onSubmit={addTask}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Enter a new task"
            autoFocus
          />
          <button id="add-button" type="submit">Add</button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.isEditing ? (
                <div>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => editTask(task.id, e.target.value)}
                    autoFocus
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                  <button onClick={() => cancelEdit(task.id)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {task.text}
                  <button onClick={() => startEditing(task.id)}>Edit</button>
                </div>
              )}
              <button className="delete" onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
