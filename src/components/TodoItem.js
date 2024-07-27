// src/components/TodoItem.js
import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem({ todo, index, toggleComplete, editTodo, deleteTodo, editIndex, editText, setEditText, updateTodo }) {
  return (
    <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      {editIndex === index ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={updateTodo}
          onKeyPress={(e) => e.key === 'Enter' && updateTodo()}
          className={styles.editInput}
        />
      ) : (
        <span onClick={() => toggleComplete(index)} className={styles.todoText}>{todo.text}</span>
      )}
      <div className={styles.actions}>
        <button onClick={() => editTodo(index)} className={styles.editButton}>Edit</button>
        <button onClick={() => deleteTodo(index)} className={styles.deleteButton}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
