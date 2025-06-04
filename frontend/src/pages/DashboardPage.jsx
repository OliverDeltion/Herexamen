import React, { useState } from "react";
import NavigationBar from "../components/common/NavigationBar";
import Footer from "../components/common/Footer";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import TeacherDashboard from "../components/dashboard/TeacherDashboard";
import Modal from "../components/common/Modal";

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
			
			<div className="dashboard-container">
				{selectedRole === null && (
					<>
						<h1 className="dashboard-heading">Selecteer account</h1>
						<div className="dashboard-buttons">
						<button onClick={() => handleSelectedRole("student")} className="btn-student">
							Student
						</button>
						<button onClick={() => handleSelectedRole("docent")} className="btn-docent">
							Docent
						</button>
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
