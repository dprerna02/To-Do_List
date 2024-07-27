// src/App.js
import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo, i) => 
      i === editIndex ? { ...todo, text: editText } : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className={styles.App}>
      <h1>To-Do List</h1>
      <div className={styles.inputSection}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className={styles.input}
        />
        <button onClick={addTodo} className={styles.addButton}>Add</button>
      </div>
      <div className={styles.filterButtons}>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.active : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? styles.active : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? styles.active : ''}>Completed</button>
      </div>
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        editIndex={editIndex}
        editText={editText}
        setEditText={setEditText}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
