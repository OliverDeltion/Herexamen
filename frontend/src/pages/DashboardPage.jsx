import React, { useState } from "react";
import NavigationBar from "../components/common/NavigationBar";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import TeacherDashboard from "../components/dashboard/TeacherDashboard";

import "../App.css";

const DashboardPage = () => {
	const [selectedRole, setSelectedRole] = useState("null");

	const handleSelectedRole = (role) => {
		setSelectedRole(role);
	};

	const handleBack = () => {
		setSelectedRole("null");
	};

	return (
		<div>
			{<NavigationBar />}

			<div className="text-center">
				{selectedRole === "null" && (
					<div className="accounts">
						<h1 className="text-h1">Selecteer account</h1>
						<button onClick={() => handleSelectedRole("student")} className="student">
							Student
						</button>
						<br />
						<button onClick={() => handleSelectedRole("docent")} className="docent">
							Docent
						</button>
					</div>
				)}

				{selectedRole === "student" && (
					<div>
						<button onClick={handleBack} className="student-terug">
							Terug
						</button>
						<StudentDashboard />
					</div>
				)}

				{selectedRole === "docent" && (
					<div>
						<button onClick={handleBack} className="docent-terug">
							Terug
						</button>
						<TeacherDashboard />
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardPage;
