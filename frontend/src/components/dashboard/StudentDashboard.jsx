import React from "react";
import "./StudentDashboard.scss";

const student = {
	naam: "Jan Jansen",
	studentNumber: "S1234567",
	attendance: 310,
	schedule: 400,
	week: 23,
	year: 2025,
	profilePhoto: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", 
};

function getAttendanceColor(percentage) {
    if (percentage === 100) return "color-perfect";
    if (percentage >= 95) return "color-excellent";
    if (percentage >= 80) return "color-goed";
    if (percentage >= 65) return "color-redelijk";
    if (percentage >= 50) return "color-onvoldoende";
    if (percentage > 0) return "color-kritiek";
    return "color-fail";
}

const StudentDashboard = () => {
    const percentage = Math.round((student.attendance / student.schedule) * 100);
    const colorClass = getAttendanceColor(percentage);

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
                    <strong>Aanwezigheid (week):</strong> {student.attendance} min
                    {" = "}
                    <span style={{ fontWeight: "bold" }}>
                        {percentage}%<span className={`attendance-dot ${colorClass}`}></span>
                    </span>
                </p>
                <p>
                    <strong>Rooster (week):</strong> {student.schedule} min
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
