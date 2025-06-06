import React, { useState } from "react";
import Footer from "../components/common/Footer";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import TeacherDashboard from "../components/dashboard/TeacherDashboard";
import Modal from "../components/common/Modal";
import LoginModal from "../components/student/LoginModal";

//Styles
import "../styles/global.css";
import "../App.css";

const DashboardPage = () => {

	const [selectedRole, setSelectedRole] = useState(null);
	const [studentData, setStudentData] = useState(null);
	const [isLoginOpen, setIsLoginOpen] = useState(true);

	    const handleSelectedRole = (role) => {
			setSelectedRole(role);
			if (role === "student") {
				setIsLoginOpen(true);
			}
    };

	const handleLogin = (data) => {
		setStudentData(data);
		setIsLoginOpen(false);
	};

    const handleBack = () => {
		setSelectedRole(null);
		setStudentData(null);
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

				{/* Login Modal voor student */}
				<LoginModal
					isOpen={isLoginOpen}
					onClose={handleBack}
					onLogin={handleLogin}
				/>
				{/* Modal voor gekozen rol */}
				<Modal isOpen={selectedRole === "docent" || studentData} onClose={handleBack}>
					<div className="dashboard-modal-content">
				{selectedRole === "docent" && (
							<>
						<button onClick={handleBack} className="docent-terug">
							Terug
						</button>
						<TeacherDashboard />
							</>
				)}

				{selectedRole === "student" && studentData && (
							<>
						<button onClick={handleBack} className="docent-terug">
							Terug
						</button>
						<StudentDashboard studentData={studentData} />
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
