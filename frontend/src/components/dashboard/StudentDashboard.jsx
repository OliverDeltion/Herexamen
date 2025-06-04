import React, { useState } from "react";
import "./StudentDashboard.scss";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const studentWeeks = [
    {
        naam: "Jan Jansen",
        studentNumber: "S1234567",
        attendance: 240,
        schedule: 500,
        week: 22,
        year: 2025,
        profilePhoto: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    {
        naam: "Jan Jansen",
        studentNumber: "S1234567",
        attendance: 300,
        schedule: 500,
        week: 23,
        year: 2025,
        profilePhoto: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
    {
        naam: "Jan Jansen",
        studentNumber: "S1234567",
        attendance: 345,
        schedule: 500,
        week: 24,
        year: 2025,
        profilePhoto: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    },
];

const sortedStudentWeeks = [...studentWeeks].sort((a, b) => a.week - b.week);

const avgPercentage = Math.round(
    sortedStudentWeeks.reduce((sum, w) => sum + w.attendance, 0) /
    sortedStudentWeeks.reduce((sum, w) => sum + w.schedule, 0) * 100
);

function getAttendanceColor(percentage) {
    if (percentage === 100) return "perfect";
    if (percentage >= 95) return "excellent";
    if (percentage >= 80) return "goed";
    if (percentage >= 65) return "redelijk";
    if (percentage >= 50) return "onvoldoende";
    if (percentage > 0) return "kritiek";
    return "fail";
}

const StudentDashboard = () => {
    const [weekIndex, setWeekIndex] = useState(0);
    const student = sortedStudentWeeks[weekIndex];
    const percentage = Math.round((student.attendance / student.schedule) * 100);
    const colorClass = getAttendanceColor(percentage);

    // Data voor staafdiagram
    const barData = {
        labels: sortedStudentWeeks.map(w => `Week ${w.week}`),
        datasets: [
            {
                label: "Aanwezigheid (%)",
                data: sortedStudentWeeks.map(w =>
                    w.schedule > 0 ? Math.round((w.attendance / w.schedule) * 100) : 0
                ),
                backgroundColor: "#bdbdbd", // Neutraal grijs
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.parsed.y}%`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: "Aanwezigheid (%)" }
            }
        }
    };

    return (
        <div className="student-dashboard-flex">
            <div className="student-dashboard-container">
                <div className="student-dashboard-content">
                    <div className="student-profile-photo">
                        <img
                            src={student.profilePhoto}
                            alt="Profielfoto"
                            className={`profile-border-${colorClass}`}
                        />
                    </div>
                    <h2>{student.naam}</h2>
                    <p>
                        <strong>Studentnummer:</strong> {student.studentNumber}
                    </p>
                    <p>
                        <strong>Aanwezigheid (week):</strong> {student.attendance} min
                        {" = "}
                        <span style={{ fontWeight: "bold" }}>
                            {percentage}%
                            <span className={`attendance-dot attendance-color-${colorClass}`}></span>
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
                    <span className="status" style={{ textTransform: "capitalize" }}>
                        Aanwezigheid: <span className={`status-color-${colorClass}`}>{colorClass}</span>
                    </span>
                    <div style={{ marginTop: "1rem" }}>
                        <button
                            onClick={() => setWeekIndex((weekIndex + sortedStudentWeeks.length - 1) % sortedStudentWeeks.length)}
                            style={{
                                marginRight: "0.5rem",
                                padding: "0.25rem 0.7rem",
                                fontSize: "0.85rem",
                                borderRadius: "4px"
                            }}
                        >
                            Vorige week
                        </button>
                        <button
                            onClick={() => setWeekIndex((weekIndex + 1) % sortedStudentWeeks.length)}
                            style={{
                                padding: "0.25rem 0.7rem",
                                fontSize: "0.85rem",
                                borderRadius: "4px"
                            }}
                        >
                            Volgende week
                        </button>
                    </div>
                </div>
            </div>
            <div className="student-dashboard-average">
                <h3>Gemiddelde aanwezigheid</h3>
                <div style={{ width: 240, margin: "0 auto" }}>
                    <Bar data={barData} options={barOptions} />
                </div>
                <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
                    Gemiddelde: {avgPercentage}%
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
