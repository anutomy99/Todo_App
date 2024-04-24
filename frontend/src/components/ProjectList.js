import React from 'react';
import styles from './ProjectList.module.css';
import Navbar from './Navbar';

const ProjectList = ({ projects, onDelete, onView, onEdit }) => {
    if (!Array.isArray(projects)) {
        return <div>Loading...</div>; 
    }

    const reversedProjects = projects.slice().reverse();

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className={styles.ProjectListContainer}>
            <Navbar/>
            {reversedProjects.length === 0 ? (
                <h5 className="text-center mt-5">No projects created yet.</h5>
            ) : (
                <table className="mt-5">
                    <thead className="thead-dark">
                        <tr className='text-center'>
                            <th>Title</th>
                            <th>Created Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reversedProjects.map(project => (
                            <tr className='text-center' key={project.id}>
                                <td>{project.title}</td>
                                <td>{formatDate(project.createdTime)}</td> 
                                <td >
                                    <button className='btn btn-primary'style={{ width: '110px' }}  onClick={() => onView(project.id)}>View Todos</button>
                                    <button className='btn btn-warning text-white' onClick={() => onEdit(project.id)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => onDelete(project.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProjectList;
