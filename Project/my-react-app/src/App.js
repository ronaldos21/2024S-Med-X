import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/main/main.js';
import Login from './pages/Login.js';
import { AuthProvider } from './components/session/AuthContext.js';
import { auth } from './firebase.js'; // Import auth from firebase.js
import PrintableReport from './test/printpdf.js';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
    }, []);

    return (
        <AuthProvider>
            <div className="App overflow-y-scroll no-scrollbar">
                {user ? <Main user={user} /> : <Login/>} 
            </div>
        </AuthProvider>
    );
}

export default App;