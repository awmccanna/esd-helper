import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface JobApplication {
    company: string;
    url: string;
    position: string;
    appliedDate: string;
}

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
}

const Applications: React.FC = () => {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/applications')
            .then(response => {
                setApplications(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });

    }, [])

    return (
        <div>
            <h2>Job Applications</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {applications.map((app, index) => (
                        <li key={index}>
                            <p>
                                <strong onClick={() => copyToClipboard(app.company)}
                                    style={{ cursor: 'pointer' }}
                                    title="Copy to clipboard">
                                    Company:{' '}
                                </strong>
                                {app.company}
                            </p>
                            <p>
                                <strong onClick={() => copyToClipboard(app.position)}
                                    style={{ cursor: 'pointer' }}
                                    title="Copy to clipboard">
                                    Position:{' '}
                                </strong>
                                {app.position}
                            </p>
                            <p>
                                <strong onClick={() => copyToClipboard(app.url)}
                                    style={{ cursor: 'pointer' }}
                                    title="Copy to clipboard">
                                    URL:{' '}
                                </strong>
                                <a href={app.url} target="_blank" rel="noopener noreferrer">
                                    {app.url}
                                </a>
                            </p>
                            <p>
                                <strong onClick={() => copyToClipboard(new Date(app.appliedDate).toLocaleDateString())}
                                    style={{ cursor: 'pointer' }}
                                    title="Copy to clipboard">
                                    Applied Date:{' '}
                                </strong>
                                {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Applications;