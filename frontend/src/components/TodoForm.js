import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Project.module.css'; 
import Navbar from './Navbar';

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [alert, setAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { projectId, id } = useParams(); 

    useEffect(() => {
      
        if (id) {
            fetchTodoDetails();
        }
    }, [id]);

    const fetchTodoDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/todoApp/todolists/get-todo/${id}`);
            const todo = response.data; 
            setTitle(todo.title);
            setDescription(todo.description);
        } catch (error) {
            console.error('Error fetching todo details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() && !description.trim()) {
            setAlert(true);
        } else {
            setAlert(false);
            try {
                const endpoint = id ? `update-todo/${id}` : `create-todolist/${projectId}`;
                const method = id ? 'put' : 'post'; 
                const response = await axios[method](`http://localhost:8080/todoApp/todolists/${endpoint}`, {
                    title: title,
                    description: description
                });
                console.log('Todo operation successful:', response.data);
                setSuccessMessage(id ? "Todo edited successfully!" : "Todo created successfully!");
                setTitle("");
                setDescription("");
            } catch (error) {
                console.error('Error performing Todo operation:', error);
            }
        }
    };

    return (
        <div className={styles.projectFormContainer}>
            <Navbar/>
            <div className='container'>
                <h3 className='text-center mt-5'>{id ? 'Edit Todo' : 'Create a Todo'}</h3>
                <form className={styles.projectForm} onSubmit={handleSubmit}>
                    {alert ? (
                        <div className="alert alert-danger" role="alert"> Please enter a valid data</div>
                    ) : successMessage ? (
                        <div className="alert alert-success" role="alert">{successMessage}</div>
                    ) : null}
                    <label className='px-2'>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <label className='px-2'>Description</label>
                    <textarea rows="4" cols="51" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <button className='btn btn-success' type="submit">{id ? 'Save Changes' : 'Create'}</button>
                </form>
            </div>
        </div>
    );
};

export default TodoForm;
