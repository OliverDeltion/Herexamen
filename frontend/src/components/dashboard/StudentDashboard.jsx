import React from "react";
import "./StudentDashboard.scss";

const student = {
	naam: "Jan Jansen",
	studentNumber: "S1234567",
	attendance: 200,
	schedule: 400,
	week: 23,
	year: 2025,
	profilePhoto: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", 
};

const StudentDashboard = () => {
	return (
		<div className="student-dashboard-container">
			<div className="student-dashboard-content">
				<div className="student-profile-photo">
					<img
						src={student.profilePhoto}
						alt="Profielfoto"
					/>
				</div>
				<h2>Student Dashboard</h2>
				<p>
					<strong>Naam:</strong> {student.naam}
				</p>
				<p>
					<strong>Studentnummer:</strong> {student.studentNumber}
				</p>
				<p>
					<strong>Aanwezigheid (week):</strong> {student.attendance} = {Math.round((student.attendance / student.schedule) * 100)}%
				</p>
				<p>
					<strong>Rooster (week):</strong> {student.schedule} 
				</p>
				<p>
					<strong>Week:</strong> {student.week}
				</p>
				<p>
					<strong>Jaar:</strong> {student.year}
				</p>
			</div>
		</div>
	);
};

export default StudentDashboard;
