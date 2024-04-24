import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Project.module.css'; 
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const ProjectForm = () => {
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams(); 
    
    useEffect(() => {
       
        if (id) {
            fetchProjectDetails();
        }
    }, [id]);

    const fetchProjectDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/todoApp/projects/getBy-id/${id}`);
            const project = response.data; 
            setTitle(project.title);
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setAlert(true); 
        } else {
            setAlert(false);
            try {
                const endpoint = id ? `edit-title/${id}` : 'create-project';
                const method = id ? 'put' : 'post';
                const response = await axios[method](`http://localhost:8080/todoApp/projects/${endpoint}`, {
                    title: title
                });
                console.log('Project operation successful:', response.data);
                setSuccessMessage(id ? "Project edited successfully!" : "Project created successfully!");
                setTitle(""); 
            } catch (error) {
                console.error('Error performing project operation:', error);
            }
        }
    };

    return (
        
        <div className={styles.projectFormContainer}>
            <Navbar/>
            <div className='container'>
                <h3 className='text-center mt-5'>{id ? 'Edit Project' : 'Create a Project'}</h3>
                <form className={styles.projectForm} onSubmit={handleSubmit}>
                    {alert ? (
                        <div className="alert alert-danger" role="alert"> Please enter a valid data</div>
                    ) : successMessage ? (
                        <div className="alert alert-success" role="alert">{successMessage}</div>
                    ) : null}
                    <label className='px-2'>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <button className='btn btn-success' type="submit">{id ? 'Save Changes' : 'Create'}</button>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
