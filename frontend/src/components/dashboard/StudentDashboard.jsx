import React, { useState, useEffect } from "react";
import "./StudentDashboard.scss";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactModal from "react-modal";
import axios from "axios";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const weeks = [
    {
        week: 22,
        year: 2025,
        schedule: 500,
        attendance: 240
    },
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
    const [modalOpen, setModalOpen] = useState(false);
    const [filterStart, setFilterStart] = useState(0);
    const [filterEnd, setFilterEnd] = useState(weeks.length - 1);
    const [selectedWeeks, setSelectedWeeks] = useState(randomWeeks.map((_, i) => i));
    const [data, setData] = useState([]);


    useEffect(() => {
            async function fetchData() {
                try {
                    const response = await axios.get("http://localhost:3000/api/students/st5172541747/stats ");
                    console.log(response.data)
                    setData(response.data)
                } catch (error) {
                    // als het fout gaat, gewoon loggen in console
                    console.error("Fout bij het ophalen van studenten:", error);
                }
            }
            fetchData();
        }, []);

   return(
    <div> {JSON.stringify(data)}
    </div>
   );}
export default StudentDashboard;
