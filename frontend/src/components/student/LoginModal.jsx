import React, { useState } from 'react';
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [studentNumber, setStudentNumber] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/students/${studentNumber}/stats`);
            if (!res.ok) throw new Error("Ongeldige studentnummer");
            const data = await res.json();
            
            onLogin({
                studentNumber: data.studentnummer,
                naam: data.naam || "Naam student",
            })
        } catch (err) {
            setError("Studentnummer is ongeldig of niet gevonden");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="login-modal-overlay" onClick={onClose}>
            <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Log in als student</h2>
                <input
                type="text"
                placeholder="studentnummer"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                />
                {error && <p className="error-text">{error}</p>}
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginModal;