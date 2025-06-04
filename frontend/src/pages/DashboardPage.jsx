import React, { useState } from "react";
import NavigationBar from "../components/common/NavigationBar";
import Footer from "../components/common/Footer";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import TeacherDashboard from "../components/dashboard/TeacherDashboard";

//Styles
import "../styles/global.css";
import "../App.css";

const DashboardPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    console.log("Selected Role:", selectedRole);

    const handleSelectedRole = (role) => {
        setSelectedRole(role);
    };

    const handleBack = () => {
        setSelectedRole(null);
    };

    return (
        <>
            <NavigationBar />
            
            <div className="text-center">
                {selectedRole === null && (
                    <div className="accounts">
                        <h1 className="text-h1">Selecteer account</h1>
                        <button onClick={() => handleSelectedRole("student")} className="student-button">
                            Student
                        </button>
                        <br />
                        <button onClick={() => handleSelectedRole("docent")} className="docent-button">
                            Docent
                        </button>
                    </div>
                )}
                {selectedRole === "student" && (
                    <>
                        <button onClick={handleBack} className="student-terug">
                            Terug
                        </button>
                        <StudentDashboard />
                    </>
                )}
                {selectedRole === "docent" && (
                    <>
                        <p>Geselecteerd: {selectedRole}</p>
                        <button onClick={handleBack} className="docent-terug">
                            Terug
                        </button>
                        <TeacherDashboard />
                    </>
                )}
            </div>
        </>
    );
};

export default DashboardPage;
