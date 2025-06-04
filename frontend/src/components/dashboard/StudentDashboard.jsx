import React, { useState, useEffect } from "react";
import "./StudentDashboard.scss";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const weeks = [
    { attendance: 240, schedule: 500, week: 22, year: 2025 },
    { attendance: 300, schedule: 500, week: 23, year: 2025 },
    { attendance: 345, schedule: 500, week: 24, year: 2025 },
];

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
    const [student, setStudent] = useState(null);
    const [weekIndex, setWeekIndex] = useState(0);
    const [randomWeeks, setRandomWeeks] = useState(weeks);

    useEffect(() => {
        fetch("https://randomuser.me/api/")
            .then(res => res.json())
            .then(data => {
                const user = data.results[0];
                setStudent({
                    naam: `${user.name.first} ${user.name.last}`,
                    studentNumber: user.login.username.toUpperCase(),
                    profilePhoto: user.picture.large,
                });
            });

        // Randomize attendance for each week
        const randomized = weeks.map(w => ({
            ...w,
            attendance: Math.floor(Math.random() * (w.schedule + 1)), // 0 t/m schedule
        }));
        setRandomWeeks(randomized);
    }, []);

    const sortedWeeks = [...randomWeeks].sort((a, b) => a.week - b.week);
    const currentWeek = sortedWeeks[weekIndex];
    const percentage = Math.round((currentWeek.attendance / currentWeek.schedule) * 100);
    const colorClass = getAttendanceColor(percentage);

    const barData = {
        labels: sortedWeeks.map(w => `Week ${w.week}`),
        datasets: [
            {
                label: "Aanwezigheid (%)",
                data: sortedWeeks.map(w =>
                    w.schedule > 0 ? Math.round((w.attendance / w.schedule) * 100) : 0
                ),
                backgroundColor: "#bdbdbd",
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

    const avgPercentage = Math.round(
        sortedWeeks.reduce((sum, w) => sum + w.attendance, 0) /
        sortedWeeks.reduce((sum, w) => sum + w.schedule, 0) * 100
    );

    if (!student) return <div>Loading...</div>;

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
                        <strong>Aanwezigheid (week):</strong> {currentWeek.attendance} min
                        {" = "}
                        <span style={{ fontWeight: "bold" }}>
                            {percentage}%
                            <span className={`attendance-dot attendance-color-${colorClass}`}></span>
                        </span>
                    </p>
                    <p>
                        <strong>Rooster (week):</strong> {currentWeek.schedule} min
                    </p>
                    <p>
                        <strong>Week:</strong> {currentWeek.week}
                    </p>
                    <p>
                        <strong>Jaar:</strong> {currentWeek.year}
                    </p>
                    <span className="status" style={{ textTransform: "capitalize" }}>
                        Aanwezigheid: <span className={`status-color-${colorClass}`}>{colorClass}</span>
                    </span>
                    <div style={{ marginTop: "1rem" }}>
                        <button
                            onClick={() => setWeekIndex((weekIndex + sortedWeeks.length - 1) % sortedWeeks.length)}
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
                            onClick={() => setWeekIndex((weekIndex + 1) % sortedWeeks.length)}
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
                <Bar data={barData} options={barOptions} />
                <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
                    Gemiddelde: {avgPercentage}%
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
