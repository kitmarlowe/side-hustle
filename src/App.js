// Importing necessary modules and components from React, CSS, and FontAwesome
import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  // State 'tasks' holds the list of tasks. 'setTasks' is used to update this list.
  const [tasks, setTasks] = useState([]);
  // State 'task' holds the current value of the new task input field.
  const [task, setTask] = useState('');

  // This effect runs once on component mount, loading tasks from local storage.
  useEffect(() => {
    const loadedTasks = localStorage.getItem('tasks');
    if (loadedTasks) {
      setTasks(JSON.parse(loadedTasks)); // Parse the string from local storage back into an array
    }
  }, []);

  // This effect runs whenever the 'tasks' state changes, saving tasks to local storage.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert the 'tasks' array to a string and store it
  }, [tasks]);

  // Function to handle adding a new task from the form submission.
  const addTask = (event) => {
    event.preventDefault(); // Prevents the browser from refreshing when the form is submitted
    if (!task.trim()) return; // Ignore empty tasks
    setTasks([...tasks, { id: Date.now(), text: task, isEditing: false }]);
    setTask(''); // Clear the input field after adding a task
  };

  // Function to update a task's text.
  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, text: newText } : task;
    });
    setTasks(updatedTasks);
  };

  // Function to enable editing mode for a task.
  const startEditing = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: true } : task;
    });
    setTasks(updatedTasks);
  };

  // Function to save the edited task and disable editing mode.
  const saveEdit = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: false } : task;
    });
    setTasks(updatedTasks);
  };

  // Function to cancel editing mode without saving the task.
  const cancelEdit = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: false } : task;
    });
    setTasks(updatedTasks);
  };

  // Function to delete a task.
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id)); // Remove the task from the list
  };

  // Rendering the component to the DOM
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
            autoFocus // Focus this input automatically when the form appears
          />
          <button type="submit">Add</button>
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
                <FontAwesomeIcon icon={faTrash} /> {/* Icon for delete operation */}
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App; // Make this component available for import into other files
