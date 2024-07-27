// src/components/TodoList.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

function TodoList({ todos, toggleComplete, editTodo, deleteTodo, editIndex, editText, setEditText, updateTodo }) {
  return (
    <TransitionGroup component="ul" className={styles.todoList}>
      {todos.map((todo, index) => (
        <CSSTransition key={index} timeout={500} classNames={styles}>
          <TodoItem
            todo={todo}
            index={index}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            editIndex={editIndex}
            editText={editText}
            setEditText={setEditText}
            updateTodo={updateTodo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default TodoList;
