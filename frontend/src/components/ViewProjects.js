import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectList from './ProjectList';

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8080/todoApp/projects/getAll-projects');
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching project list:', error);
            setLoading(false); 
        }
    };

    const handleViewProjects = (projectId) => {
        window.location.href =`/getTodoBy-projectId/${projectId}`;
    };

    const handleEditProject = (id) => {
        window.location.href = `/edit-title/${id}`;
    };

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/todoApp/projects/delete-project/${id}`);
            fetchProjects(); 
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <h1 className="text-center mt-5">Loading...</h1>
            ) : (
                <ProjectList
                    projects={projects}
                    onView={handleViewProjects}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                />
            )}
        </div>
    );
};

export default ViewProjects;
