import React, { useState, useEffect } from 'react';

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

    const fetchApplications = async () => {
        setLoading(true);
        try {
            console.log('Fetching applications');
            const data = await window.electron.getApplications();

            if (data.error) {
                console.error('Error fetching applications:', data.error);
            } else {
                setApplications(data);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div>
            <h2>Job Applications</h2>
            <button onClick={fetchApplications} style={{
                    padding: '5px 10px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f0f0f0'
                }}>
                    🔄 Refresh
                </button>
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