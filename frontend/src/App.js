import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import ViewProjects from './components/ViewProjects';
import ViewTodos from './components/ViewTodos';
import TodoForm from './components/TodoForm';
import Home from './components/Home';

const App = () => {
    
    return (
        <Router>
            <Routes>

                <Route exact path="/" element={<Home/>} />
                <Route exact path="/create-project" element={<ProjectForm />} />
                <Route exact path="/getAll-projects" element={<ViewProjects/>} />
                <Route exact path="/edit-title/:id" element={<ProjectForm/>} /> 
                <Route exact path="/getTodoBy-projectId/:projectId" element={<ViewTodos/>} />
                <Route exact path="/create-todolist/:projectId" element={<TodoForm />} />
                <Route exact path="/update-todo/:id" element={<TodoForm />} />
                


            </Routes>
        </Router>
    );
};

export default App;
