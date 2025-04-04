import React, { useState, useEffect, useCallback } from 'react';
import styles from './Applications.module.css';

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
    const [groupedApplications, setGroupedApplications] = useState<Map<string, JobApplication[]>>(new Map());
    const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());

    const getApplications = async () => {
        setLoading(true);
        try {
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

    const groupApplications = useCallback(() => {
        const grouped = new Map<string, JobApplication[]>();

        applications.forEach((application) => {
            const d = new Date(application.appliedDate);
            d.setHours(0, 0, 0, 0);
            // Subtract the day of the week to make sure we reference Sunday.
            d.setDate(d.getDate() - d.getDay());
            const startOfWeek = d.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/\//g, '/');
            
            if (grouped.has(startOfWeek)) {
                grouped.get(startOfWeek)!.push(application);
            } else {
                grouped.set(startOfWeek, [application]);
            }
        })

        setGroupedApplications(grouped);
    }, [applications])

    const toggleWeek = (week: string) => {
        setExpandedWeeks(prev => {
            const newSet = new Set(prev);
            newSet.has(week) ? newSet.delete(week) : newSet.add(week);
            return newSet;
        });
    }

    useEffect(() => {
        getApplications();
    }, []);

    useEffect(() => {
        groupApplications();
    }, [applications]);

    return (
        <div className={styles.container}>
            <h2>Job Applications</h2>
            <button onClick={getApplications} className={styles.refreshButton}>
                Refresh
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {[...groupedApplications.entries()].map(([week, applications]) => (
                        <div key={week}>
                            <h3
                                onClick={() => toggleWeek(week)}
                                className={styles.weekHeader}
                            >
                                Week of {week} {expandedWeeks.has(week) ? '▼' : '▶'}
                            </h3>
                            {
                                expandedWeeks.has(week) && (
                                    <ul className={styles.appList}>
                                        {applications.map((app, index) => (
                                            <li key={index} className={styles.appItem}>
                                                <p>
                                                    <strong
                                                        onClick={() => copyToClipboard(app.company)}
                                                        className={styles.copyable}
                                                        title="Copy to clipboard">
                                                        Company:{' '}
                                                    </strong>
                                                    {app.company}
                                                </p>
                                                <p>
                                                    <strong onClick={() => copyToClipboard(app.position)}
                                                        className={styles.copyable}
                                                        title="Copy to clipboard">
                                                        Position:{' '}
                                                    </strong>
                                                    {app.position}
                                                </p>
                                                <p>
                                                    <strong onClick={() => copyToClipboard(app.url)}
                                                        className={styles.copyable}
                                                        title="Copy to clipboard">
                                                        URL:{' '}
                                                    </strong>
                                                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                                                        {app.url}
                                                    </a>
                                                </p>
                                                <p>
                                                    <strong onClick={() => copyToClipboard(new Date(app.appliedDate).toLocaleDateString())}
                                                        className={styles.copyable}
                                                        title="Copy to clipboard">
                                                        Applied Date:{' '}
                                                    </strong>
                                                    {new Date(app.appliedDate).toLocaleDateString()}
                                                </p>
                                                <hr />
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Applications;