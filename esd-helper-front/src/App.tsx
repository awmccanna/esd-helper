import React from 'react';
import Applications from './components/Applications';
import AddApplication from './components/AddApplication';

const App: React.FC = () => {
    return (
        <div>
            <h1>Job Application Tracker</h1>
            <AddApplication />
            <Applications />
        </div>
    );
};

export default App;
