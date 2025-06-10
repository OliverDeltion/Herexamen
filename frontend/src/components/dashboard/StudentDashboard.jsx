import React, { useState, useEffect, useRef } from "react";
import "./StudentDashboard.scss";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactModal from "react-modal";
import ExportButton from "../dashboard/ExportButton";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function getAttendanceColor(percentage) {
    if (percentage === 100) return "perfect";
    if (percentage >= 95) return "excellent";
    if (percentage >= 80) return "goed";
    if (percentage >= 65) return "redelijk";
    if (percentage >= 50) return "onvoldoende";
    if (percentage > 0) return "kritiek";
    return "fail";
}

const StudentDashboard = ({ studentData }) => {
    const [student, setStudent] = useState(null);
    const [weekIndex, setWeekIndex] = useState(0);
    const [randomWeeks, setRandomWeeks] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [filterStart, setFilterStart] = useState(0);
    const [filterEnd, setFilterEnd] = useState(0);
    const [selectedWeeks, setSelectedWeeks] = useState([]);
    const chartRef = useRef(null);
    const infoRef = useRef(null);
    const summaryRef = useRef(null);

    // Laad de student data - Nirmin
    useEffect(() => {
        if (studentData) {
            // Haal een random user op voor profielfoto en naam
            fetch("https://randomuser.me/api/")
                .then(res => res.json())
                .then(randomUser => {
                    const user = randomUser.results[0];
                    setStudent({
                        naam: `${user.name.first} ${user.name.last}`,
                        studentNumber: studentData.studentNumber,
                        profilePhoto: user.picture.large,
                    });
                });
        }

        // Laat de echte week data per filter zien van de student - Nirmin
        fetch("http://localhost:3000/api/get/students")
            .then(res => res.json())
            .then(data => {
                const studentWeeks = data.filter(w => w.studentnummer === studentData.studentNumber);
                setRandomWeeks(studentWeeks);
                setSelectedWeeks(studentWeeks.map((_, i) => i));
                setFilterEnd(studentWeeks.length - 1);
            });
    }, [studentData]);

       // Voorkomt het laden van de dashboard als de studenten data nog niet is geladen - Nirmin
    if (!student || !randomWeeks || randomWeeks.length === 0) {
        return <div>Dashboard laden...</div>;
    }

    const sortedWeeks = [...randomWeeks].sort((a, b) => a.week - b.week);
    const currentWeek = sortedWeeks[weekIndex];
    const percentage = currentWeek?.roosterminuten
        ? Math.round((currentWeek.aanwezigheid / currentWeek.roosterminuten) * 100)
        : 0;
    const colorClass = getAttendanceColor(percentage);

    const toggleWeek = (i) => {
        setSelectedWeeks((prev) =>
            prev.includes(i)
                ? prev.filter(idx => idx !== i)
                : [...prev, i].sort((a, b) => a - b)
        );
    };

    const filteredWeeks = selectedWeeks.map(i => sortedWeeks[i]);

    const barData = {
        labels: sortedWeeks.map(w => `Week ${w.week}`),
        datasets: [
            {
                label: "Aanwezigheid (min)",
                data: sortedWeeks.map(w => w.aanwezigheid),
                backgroundColor: "#27ae60",
            },
            {
                label: "Rooster (min)",
                data: sortedWeeks.map(w => w.roosterminuten),
                backgroundColor: "#bdbdbd",
            },
        ],
    };

    const filteredBarData = {
        labels: filteredWeeks.map(w => `Week ${w.week}`),
        datasets: [
            {
                label: "Aanwezigheid (min)",
                data: filteredWeeks.map(w => w.aanwezigheid),
                backgroundColor: "#27ae60",
            },
            {
                label: "Rooster (min)",
                data: filteredWeeks.map(w => w.roosterminuten),
                backgroundColor: "#bdbdbd",
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.parsed.y} min`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                // max: 100,  // Verwijder of comment deze regel uit!
                title: { display: true, text: "Aantal minuten" }
            }
        }
    };

    const avgPercentage = Math.round(
        sortedWeeks.reduce((sum, w) => sum + w.aanwezigheid, 0) /
        sortedWeeks.reduce((sum, w) => sum + w.roosterminuten, 0) * 100
    );

    // Calculate present and absent time for circular progress
    const totalAttendance = sortedWeeks.reduce((sum, w) => sum + w.aanwezigheid, 0);
    const totalSchedule = sortedWeeks.reduce((sum, w) => sum + w.roosterminuten, 0);
    const presentPercentage = Math.round((totalAttendance / totalSchedule) * 100);
    const absent = totalSchedule - totalAttendance;

    // Bereken aanwezigheid/afwezigheid voor geselecteerde weken
    const filteredAttendance = filteredWeeks.reduce((sum, w) => sum + w.aanwezigheid, 0);
    const filteredSchedule = filteredWeeks.reduce((sum, w) => sum + w.roosterminuten, 0);
    const filteredPresentPercentage = filteredSchedule > 0
        ? Math.round((filteredAttendance / filteredSchedule) * 100)
        : 0;
    const filteredAbsent = filteredSchedule - filteredAttendance;

    if (!student) return <div>Loading...</div>;

    
    return (
        <div className="student-dashboard-flex">
            <div className="student-dashboard-container">

                 { /* useRef info van student voor exportPDF - Nirmin */}
                <div ref={infoRef} className="student-dashboard-content">
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
                        <strong>Aanwezigheid (week):</strong> {currentWeek.aanwezigheid} min
                        {" = "}
                        <span style={{ fontWeight: "bold" }}>
                            {percentage}%
                            <span className={`attendance-dot attendance-color-${colorClass}`}></span>
                        </span>
                    </p>
                    <p>
                        <strong>Rooster (week):</strong> {currentWeek.roosterminuten} min
                    </p>
                    <p>
                        <strong>Week:</strong> {currentWeek.week}
                    </p>
                    <p>
                        <strong>Jaar:</strong> {currentWeek.jaar}
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

            { /* useRef Samenvatting van student voor exportPDF - Nirmin */}
            <div ref={summaryRef} className="student-dashboard-average">
                <h3>Gemiddelde aanwezigheid</h3>
                <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                    {sortedWeeks.map((w, i) => (
                        <button
                            key={w.week}
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "6px",
                                border: selectedWeeks.includes(i) ? "2px solid #27ae60" : "1px solid #ccc",
                                background: selectedWeeks.includes(i) ? "#eafaf1" : "#fff",
                                fontWeight: selectedWeeks.includes(i) ? "bold" : "normal",
                                cursor: "pointer"
                            }}
                            onClick={() => toggleWeek(i)}
                        >
                            {w.week}
                        </button>
                    ))} 
                </div>
                <div style={{ marginBottom: "1rem" }}>
                </div>
                 { /* useRef aanwezigheidsgegevens in diagrammen exportPDF - Nirmin */}
                <div ref={chartRef}>
                <Bar
                    data={filteredBarData}
                    options={barOptions}
                    height={200}
                    width={400}
                    onClick={() => setModalOpen(true)}
                    />
                    </div>
                <div className="dashboard-average-percentage">
                </div>
                <div className="dashboard-circular-progress" style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                    {/* Algemeen */}
                    <div>
                        <CircularProgressbar
                            value={presentPercentage}
                            text={`${presentPercentage}%`}
                            styles={buildStyles({
                                pathColor: "#27ae60",
                                trailColor: "#e74c3c",
                                textColor: "#222",
                            })}
                        />
                        <div className="dashboard-circular-legend">
                            <span className="present">Aanwezig: {totalAttendance} min</span><br />
                            <span className="absent">Afwezig: {absent} min</span>
                        </div>
                        <div style={{ fontSize: "0.9rem", marginTop: 4, color: "#888" }}>Totaal</div>
                    </div>
                    {/* Gefilterd */}
                    <div>
                        <CircularProgressbar
                            value={filteredPresentPercentage}
                            text={`${filteredPresentPercentage}%`}
                            styles={buildStyles({
                                pathColor: "#27ae60",
                                trailColor: "#e74c3c",
                                textColor: "#222",
                            })}
                        />
                        <div className="dashboard-circular-legend">
                            <span className="present">Aanwezig: {filteredAttendance} min</span><br />
                            <span className="absent">Afwezig: {filteredAbsent} min</span>
                        </div>
                        <div style={{ fontSize: "0.9rem", marginTop: 4, color: "#888" }}>Gefilterd</div>
                    </div>
                </div>
                <ReactModal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    style={{
                        content: {
                            maxWidth: "800px",
                            margin: "auto",
                            height: "550px",
                            overflow: "hidden"
                        }
                    }}
                    ariaHideApp={false}
                >
                    <h3>Uitvergrote grafiek</h3>
                    <Bar data={barData} options={barOptions} height={400} width={700} />
                    <button onClick={() => setModalOpen(false)}>Sluiten</button>
                </ReactModal>

                {/* Export pdf - Nirmin */}
                <ExportButton
                    studentData={student}
                    filteredWeeks={filteredWeeks}
                    chartRef={chartRef}
                    infoRef={infoRef}
                    summaryRef={summaryRef}
                /> 
            </div>
            {currentWeek.days && (
                <div style={{ marginTop: "2rem" }}>
                    <h4>Aanwezigheid per dag (week {currentWeek.week})</h4>
                    <Bar
                        data={{
                            labels: currentWeek.days.map(d => d.day),
                            datasets: [
                                {
                                    label: "Aanwezigheid (min)",
                                    data: currentWeek.days.map(d => d.aanwezigheid),
                                    backgroundColor: "#27ae60",
                                },
                                {
                                    label: "Rooster (min)",
                                    data: currentWeek.days.map(d => d.roosterminuten),
                                    backgroundColor: "#bdbdbd",
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { display: true },
                                title: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => `${context.parsed.y} min`
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: { display: true, text: "Aantal minuten" }
                                }
                            }
                        }}
                        height={120}
                    />
                </div>
            )}
        </div>
    );
};

   return(
    <div> {JSON.stringify(data)}
    </div>
   );}
export default StudentDashboard;
