import React, { useState } from 'react';
import styles from './TodoList.module.css'; 
import { useParams } from 'react-router-dom';

const TodoList = ({ todos, onCreate, onDelete, onEdit, onCompleteTodo }) => {
    const { projectId } = useParams();
    const [checkedTodos, setCheckedTodos] = useState([]);

    const toggleTodoCompletion = (id) => {
        const updatedCheckedTodos = checkedTodos.includes(id)
            ? checkedTodos.filter(todoId => todoId !== id)
            : [...checkedTodos, id];
        setCheckedTodos(updatedCheckedTodos);
        onCompleteTodo(id);
    };

    const completedTodos = todos.filter(todo => todo.status === 'COMPLETED');
    const pendingTodos = todos.filter(todo => todo.status !== 'COMPLETED');

    const reversedCompletedTodos = completedTodos.slice().reverse();
    const reversedPendingTodos = pendingTodos.slice().reverse();

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className={styles.TodoContainer}>
            <button className={styles.todoButton} onClick={() => onCreate(projectId)}>Create Todo</button>

            {/* Render pending todos */}
            {reversedPendingTodos.length > 0 && (
                <div>
                    <h5 className='text-center mt-3'>Pending Todos</h5>
                    <table className='mt-2'>
                        <thead>
                            <tr className='text-center'>
                                <th></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created Date</th>
                                <th>Updated Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {reversedPendingTodos.map(todo => (
                                <tr key={todo.id}>
                                    <td>
                                        <input 
                                            type='checkbox' 
                                            className={styles.checkbox} 
                                            checked={checkedTodos.includes(todo.id)}
                                            onChange={() => toggleTodoCompletion(todo.id)}
                                        />
                                    </td>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{formatDate(todo.createdDate)}</td> 
                                    <td>{todo.updatedDate ? formatDate(todo.updatedDate) : "Not Updated"}</td> 
                                    <td>{todo.status}</td>
                                    <td>
                                        <button className='btn btn-warning text-white' onClick={() => onEdit(todo.id)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => onDelete(todo.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Render completed todos */}
            {reversedCompletedTodos.length > 0 && (
                <div>
                    <h5 className='text-center mt-5'>Completed Todos</h5>
                    <table className='mt-2'>
                        <thead>
                            <tr className='text-center'>
                                <th></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created Date</th>
                                <th>Updated Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {reversedCompletedTodos.map(todo => (
                                <tr key={todo.id}>
                                    <td>
                                        <input 
                                            type='checkbox' 
                                            className={styles.checkbox} 
                                            checked={checkedTodos.includes(todo.id) || todo.status === 'COMPLETED'} 
                                            onChange={() => toggleTodoCompletion(todo.id)}
                                        />
                                    </td>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{formatDate(todo.createdDate)}</td> 
                                    <td>{todo.updatedDate ? formatDate(todo.updatedDate) : "Not Updated"}</td> 
                                    <td>{todo.status}</td>
                                    <td>
                                        <button className='btn btn-warning text-white' onClick={() => onEdit(todo.id)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => onDelete(todo.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {reversedPendingTodos.length === 0 && reversedCompletedTodos.length === 0 && (
                <h5 className="text-center mt-3">No todos created yet.</h5>
            )}
        </div>
    );
};

export default TodoList;
