import React, { useState } from "react";
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
			<div className="dashboard-container">
				<header className="dashboard-header">
					<h1 className="dashboard-title">Dashboard AARdata</h1>
					</header>
				{selectedRole === null && (
					<>
						<div className="dashboard-card">
						<h2 className="dashboard-heading">Selecteer account</h2>
						<div className="dashboard-buttons">
						<button onClick={() => handleSelectedRole("student")} className="btn student-btn">
							Student
						</button>
						<button onClick={() => handleSelectedRole("docent")} className="btn docent-btn">
							Docent
								</button>
								</div>
						</div>
					</>
				)}
				<Modal isOpen={!!selectedRole} onClose={handleBack}>
					<div className="dashboard-modal-content">
				{selectedRole === "student" && (
							<>
							<p>Student dashboard</p>
						<button onClick={handleBack} className="student-terug">
							Terug
						</button>
						<StudentDashboard />
							</>
				)}

				{selectedRole === "docent" && (
							<>
						<p>Docenten dashboard</p>
						<button onClick={handleBack} className="docent-terug">
							Terug
						</button>
						<TeacherDashboard />
							</>
						)}
					</div>
				</Modal>
			</div>
			<Footer />
		
		</>
		
	);
};

export default DashboardPage;
