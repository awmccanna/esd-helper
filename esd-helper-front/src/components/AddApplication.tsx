import React, { useState } from 'react';
import axios from 'axios';

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
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        console.log('submitting form');
        event.preventDefault();
        const newApplication: AddApplicationForm = {
            company,
            url,
            position,
            appliedDate
        };

        axios.post('http://localhost:8080/api/applications', newApplication, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setMessage('Application added successfully!');
                setCompany('');
                setUrl('');
                setAppliedDate('');
                setPosition('');
            })
            .catch(error => {
                if (error.response) {
                    console.error("Response Error:", error.response.data);
                    setMessage(`Error: ${error.response.data.message || "Something went wrong."}`);
                } else if (error.request) {
                    console.error("Request Error:", error.request);
                    setMessage("No response received from the server.");
                } else {
                    console.error("Axios Error:", error.message);
                    setMessage("Request setup failed.");
                }
            });
    }

    return (
        <div>
            <h2>Add New Application</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company:</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
                </div>
                <div>
                    <label>Position:</label>
                    <input type="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
                </div>
                <div>
                    <label>URL:</label>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <div>
                    <label>Applied Date:</label>
                    <input type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} required />
                </div>
                <button type="submit">Add Application</button>
            </form>
        </div>
    );
}

export default AddApplication;