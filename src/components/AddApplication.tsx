import React, { useState } from 'react';
import styles from './AddApplication.module.css';

const AddApplication: React.FC = () => {
    const [company, setCompany] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [appliedDate, setAppliedDate] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!company || !url || !position || !appliedDate) {
            setMessage('Please fill in all fields.');
            return;
        }
    
        try {
            console.log("Submitting application");
            const response = await window.electron.createApplication(company, url, position, appliedDate);
            
            if (response?.error) {
                setMessage(`Error: ${response.error}`);
            } else {
                setMessage('Application added successfully!');
                setCompany('');
                setUrl('');
                setPosition('');
                setAppliedDate('');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage('An error occurred while submitting the application.');
        }
    }

    return (

        <div className={styles.container}>
            <h2 className={styles.title}>Add New Application</h2>

            {message && <p className={styles.message}>{message}</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Company:</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Position:</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>URL:</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Applied Date:</label>
                    <input
                        type="date"
                        value={appliedDate}
                        onChange={(e) => setAppliedDate(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <button
                    type="submit"
                    className={styles.button}
                >
                    Add Application
                </button>
            </form>
        </div>
    );
}

export default AddApplication;