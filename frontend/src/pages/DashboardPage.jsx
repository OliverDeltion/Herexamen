import React,{ useState } from "react";
import StudentDashboard from "../components/StudentDashboard";
import TeacherDashboard from "../components/TeacherDashboard";

const DashboardPage = () => {
    const [selectedRole, setSelectedRole] = useState("null");

    const handleSelectedRole = (role) => {
        setSelectedRole(role);
    }

    const handleBack = () => {
        setSelectedRole("null");
    };

    return (
        <div className="dashboard-page">
            {selectedRole === "null" ? (
                <div className="role-selection">
                    <h2>Select Your Role</h2>
                    <button onClick={() => handleSelectedRole("student")}>Student</button>
                    <button onClick={() => handleSelectedRole("teacher")}>Teacher</button>
                </div>
            ) : selectedRole === "student" ? (
                <StudentDashboard onBack={handleBack} />
            ) : (
                <TeacherDashboard onBack={handleBack} />
            )}
        </div>
    );
}
    
    