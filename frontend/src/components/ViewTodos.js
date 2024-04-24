// TodoListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const ViewTodos = () => {
    const { projectId } = useParams(); 

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodoList(projectId); 
    }, [projectId]); 

    const fetchTodoList = async (projectId) => {
        try {
            const response = await axios.get(`http://localhost:8080/todoApp/todolists/getTodoBy-projectId/${projectId}`);
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todo list:', error);
        }
    };

    const handleCreateTodo = (projectId) => {
        window.location.href =`/create-todolist/${projectId}`;

    };
    const handleEditTodo = (id) => {
        window.location.href =`/update-todo/${id}`;

    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/todoApp/todolists/delete-todo/${id}`);
            fetchTodoList(projectId);
        } catch (error) {
            console.error('Error completing todo:', error);
        }
    };
    
    const handleCompleteTodo = async (id) => {
        try {
            await axios.put(`http://localhost:8080/todoApp/todolists/updateTodo-status/${id}`);
            fetchTodoList(projectId);
        } catch (error) {
            console.error('Error Deleting:', error);
        }
    };
    return (
        <div>
            <Navbar/>
            <TodoList
                todos={todos}
                onCreate={handleCreateTodo}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
                onCompleteTodo={handleCompleteTodo}
            />
        </div>
    );
};

export default ViewTodos;
