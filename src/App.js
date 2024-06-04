import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import './App.css'; // Import custom CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import specific icon from FontAwesome

function App() {
  const [tasks, setTasks] = useState([]); // State to store the list of tasks
  const [task, setTask] = useState(''); // State to store the current input task

  // useEffect to load tasks from localStorage when the component mounts
  useEffect(() => {
    const loadedTasks = localStorage.getItem('tasks'); // Retrieve tasks from localStorage
    if (loadedTasks) {
      setTasks(JSON.parse(loadedTasks)); // Parse and set tasks if they exist
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // useEffect to save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to localStorage
  }, [tasks]); // This effect runs whenever the 'tasks' state changes

  // Function to handle adding a new task
  const addTask = (event) => {
    event.preventDefault(); // Prevent form submission
    if (!task.trim()) return; // Do nothing if the input is empty or whitespace
    setTasks([...tasks, { id: Date.now(), text: task, isEditing: false }]); // Add new task to the tasks state
    setTask(''); // Clear the input field
  };

  // Function to handle editing a task
  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, text: newText } : task; // Update the task text if the ID matches
    });
    setTasks(updatedTasks); // Update the tasks state
  };

  // Function to start editing a task
  const startEditing = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: true } : task; // Set isEditing to true if the ID matches
    });
    setTasks(updatedTasks); // Update the tasks state
  };

  // Function to save the edited task
  const saveEdit = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: false } : task; // Set isEditing to false if the ID matches
    });
    setTasks(updatedTasks); // Update the tasks state
  };

  // Function to cancel editing a task
  const cancelEdit = (id) => {
    const updatedTasks = tasks.map(task => {
      return task.id === id ? { ...task, isEditing: false } : task; // Set isEditing to false if the ID matches
    });
    setTasks(updatedTasks); // Update the tasks state
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id)); // Remove the task with the matching ID
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <form onSubmit={addTask}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)} // Update the task state on input change
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
                <div className="edit-form">
                  <input
                    type="text"
                    value={task.text} // Bind input value to task text
                    onChange={(e) => editTask(task.id, e.target.value)} // Update task text on input change
                    autoFocus
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                  <button onClick={() => cancelEdit(task.id)}>Cancel</button>
                </div>
              ) : (
                <div className="task-item">
                  <div className="overflow-wrap-container">
                    <span>{task.text}</span>
                  </div>
                  <button className="edit-button" onClick={() => startEditing(task.id)}>Edit</button>
                </div>
              )}
              <button className="delete" onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrash} /> {/* Trash icon from FontAwesome */}
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App; // Export the App component
