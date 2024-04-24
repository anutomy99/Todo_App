import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarMenu}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create-project">Create Project</Link></li>
                <li><Link to="/getAll-projects">View Project</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
