/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {FaMoon, FaSun} from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodoCompletion = (id: number) => {
    const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const updatedTodos = Array.from(todos);
    const [reorderedTodo] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, reorderedTodo);
    setTodos(updatedTodos);
  };
  return (
    <div
      className="App min-h-screen"
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#000',
      }}>
      <div>
        <button
          className="mt-2 bg-blue-500 flex items-center hover:bg-blue-600 text-white font-semibold p-2 text-sm rounded"
          onClick={exampleThemeStorage.toggle}>
          <FaMoon/>{" "}/{" "}<FaSun/>
        </button>
        <div className="">
          <h1 className="text-3xl font-bold mb-4">Todo App</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Enter your todo"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded border border-gray-300"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Add Todo
            </button>
          </form>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
              {provided => (
                <ul className='m-1 mb-4 border rounded p-2 h-36 overflow-scroll scrollbar-hide' {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.map((todo, index) => (
                    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                      {provided => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between mb-2 p-2 border dark:bg-slate-900 dark:text-white rounded">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodoCompletion(todo.id)}
                            className="mr-2"
                          />
                          <span
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            className={todo.completed ? 'text-gray-500' : ''}>
                            {todo.text}
                          </span>
                          <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-600">
                            Delete
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
