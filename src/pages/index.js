import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../slices/todosSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [selectedTodos, setSelectedTodos] = useState("");

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoAdd = (e) => {
    e.preventDefault();
    dispatch(addTodo(newTodo));
    setNewTodo("");
  };

  const handleTodoToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleTodoRemove = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Todo App</h1>
        <div>
          <form onSubmit={handleNewTodoAdd}>
            <input
              type="text"
              className={styles.todoInput}
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={handleNewTodoChange}
              required
            />
            <button className={styles.addButton} type="submit">
              Add
            </button>
          </form>
          <div>
            <select
              className={styles.select}
              onChange={(e) => setSelectedTodos(e.target.value)}
            >
              <option value="">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
          {todos &&
            todos
              .filter((todo) => {
                if (selectedTodos === "completed") return todo.completed;
                if (selectedTodos === "uncompleted") return !todo.completed;
                return todo;
              })
              .map((todo) => (
                <div className={styles.todoItem} key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleTodoToggle(todo.id)}
                    className={styles.todoToggle}
                  />
                  {todo.text}
                  <button
                    className={styles.removeButton}
                    onClick={() => handleTodoRemove(todo.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
        </div>
      </main>
    </>
  );
}
