import React, { useState } from "react";
import NavigationBar from "../components/common/NavigationBar";
import Footer from "../components/common/Footer";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import TeacherDashboard from "../components/dashboard/TeacherDashboard";
import Modal from "../components/common/Modal";

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
		<div>
			<NavigationBar />
			<div className="text-center">
				{selectedRole === null && (
					<div className="accounts">
						<h1 className="text-h1">Selecteer account</h1>
						<button onClick={() => handleSelectedRole("student")}className="student-button">
							Student
						</button>
						<br />
						<button onClick={() => handleSelectedRole("docent")}className="docent-button">
							Docent
						</button>
					</div>
				)}
				<Modal isOpen={!!selectedRole} onClose={() => setSelectedRole(null)}>
					<div 
						style={{
							padding: "2rem",
							backgroundColor: "#ffffff",
							border: "2px solid #3366cc",
							borderRadius: "8px",
							color: "#000",
						}}
					>
						{selectedRole === "student" && (
							<>
							<p>Modal is open voor: {selectedRole}</p>
						<button onClick={handleBack} className="student-terug">
							Terug
						</button>
								<StudentDashboard />
							</>
						)}
						
				{selectedRole === "docent" && (
							<>
						<p>Modal is open voor: {selectedRole}</p>
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
		</div>
		
	);
};

export default DashboardPage;
