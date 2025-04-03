import React, {useState} from 'react';
import Applications from './components/Applications';
import AddApplication from './components/AddApplication';
import styles from './App.module.css';

const App: React.FC = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
    };

    return (
        <div className={`${styles.appContainer} ${darkMode ? 'dark' : ''}`}>
            
            <button 
                    onClick={toggleDarkMode}
                    className={styles.darkModeToggle}
                >
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            <div className={styles.header}>
                <h1>Job Application Tracker</h1>
            </div>
            
            <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className={`${styles.toggleButton} ${darkMode ? styles.dark : ''}`}
            >
                {showAddForm ? '▲ Hide Form' : '▼ Add New Application'}
            </button>

            {showAddForm && <AddApplication />}
            
            <Applications />
        </div>
    );
};

export default App;
