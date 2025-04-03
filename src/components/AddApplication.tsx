import React, { useState } from 'react';
import styles from './AddApplication.module.css';

interface AddApplicationForm {
    company: string;
    url: string;
    position: string;
    appliedDate: string;
}

const AddApplication: React.FC = () => {
    const [company, setCompany] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [appliedDate, setAppliedDate] = useState<string>('');
    const [message, /*setMessage*/] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        console.log('submitting form');
        event.preventDefault();
        const newApplication: AddApplicationForm = {
            company,
            url,
            position,
            appliedDate
        };

        console.log(newApplication);

        // TODO change how data is handled here
        // axios.post('http://localhost:8080/api/applications', newApplication, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => {
        //         setMessage('Application added successfully!');
        //         setCompany('');
        //         setUrl('');
        //         setAppliedDate('');
        //         setPosition('');
        //     })
        //     .catch(error => {
        //         if (error.response) {
        //             console.error("Response Error:", error.response.data);
        //             setMessage(`Error: ${error.response.data.message || "Something went wrong."}`);
        //         } else if (error.request) {
        //             console.error("Request Error:", error.request);
        //             setMessage("No response received from the server.");
        //         } else {
        //             console.error("Axios Error:", error.message);
        //             setMessage("Request setup failed.");
        //         }
        //     });
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