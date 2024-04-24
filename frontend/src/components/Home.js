import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; 

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className='container'>
                <div className="row justify-content-center mt-5 mx-2">
                    <h1>TODO APP</h1>
                    <Link to="/create-project">
                        <button className={styles.HomeBtn}>Create Project</button>
                    </Link>
                    <Link to="/getAll-projects">
                        <button className={styles.HomeBtn}>View Projects</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
