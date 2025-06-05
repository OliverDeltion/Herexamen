import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../common/NavigationBar";
import "./TeacherDashboard.css";
import "../../Global.css";
import "../common/Buttons.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// categorie bepaling op basis van percentage
const getCategorie = (percentage) => {
	if (percentage === 0) return "Geen aanwezigheid";
	if (percentage >= 100) return "Perfect";
	if (percentage >= 95) return "Excellent";
	if (percentage >= 80) return "Goed";
	if (percentage >= 65) return "Voldoende";
	if (percentage >= 50) return "Onvoldoende";
	return "Fail";
};

// css klasse toevoegen op basis van percentage
const getPercentageClass = (percentage) => {
	if (percentage === 0) return "percentage--afwezig";
	if (percentage >= 100) return "percentage--perfect";
	if (percentage >= 95) return "percentage--excellent";
	if (percentage >= 80) return "percentage--goed";
	if (percentage >= 65) return "percentage--voldoende";
	if (percentage >= 50) return "percentage--onvoldoende";
	return "percentage--fail";
};
const TeacherDashboard = () => {
	// hier komt de studentenlijst in
	const [data, setData] = useState([]);

	// dit houdt gemiddelde percentage bij van alle studenten
	const [averagePercentage, setAveragePercentage] = useState(0);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get("http://localhost:3000/api/get/students");
				// hier zetten we ze in de state
				const students = response.data;
				setData(students);
				if (students.length > 0) {
					// telt alle percentages op, als het niet bestaat dan pak je 0
					const total = students.reduce((acc, student) => acc + (student.percentage || 0), 0);
					// deelt totaal door aantal studenten => dus gemiddeld percentage
					const avg = total / students.length;
					// rond het af naar hele getallen en zet in state
					setAveragePercentage(Math.round(avg));
				}
			} catch (error) {
				// als het fout gaat, gewoon loggen in console
				console.error("Fout bij het ophalen van studenten:", error);
			}
		}
		fetchData();
	}, []);
	return (
		<div class="bg-color">
			<div class="container">
				<div class="teacherDashboard">
					<div class="teacherDashboard__container">
						<div class="teacherDashboard__top">
							<div class="teacherDashboard__start">
								<h3>Gemaakte groepen</h3>
								<div className="teacherDashboard__groups">
									{/* voorbeeld van groepen, deze zou normaal uit de database komen */}
									{[1, 2, 3, 4].map((group) => (
										<div className="teacherDashboard__group" key={group}>
											<div className="teacherDashboard__group-name">Groep {group}</div>
											<div className="teacherDashboard__group-students">Aantal studenten: 5</div>
											<a className="teacherDashboard__group-edit">Bekijk Groep</a>
											<a className="teacherDashboard__group-delete">Verwijder Groep</a>
										</div>
									))}
								</div>
								<button class="teacherDashboard__button">Maak nieuwe groep aan</button>
							</div>
							<div class="teacherDashboard__end">
								<div class="teacherDashboard__diagram">
									<div style={{ width: 250, height: 250 }}>
										<CircularProgressbar
											//percentage van de functie hier boven
											value={averagePercentage}
											text={`Algemeen\n${averagePercentage}%`}
											styles={{
												text: {
													lineHeight: 1,
													fontSize: "16px",
													whiteSpace: "pre-line",
												},
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div class="teacherDashboard__bottom">
							<div class="teacherDashboard__filter">
								<form class="teacherDashboard__filter-form">
									<div class="teacherDashboard__filter-group">
										<label for="periode">Studentnummer</label>
										<input type="text" id="studentnummer" name="studentnummer" />
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="weekStart">Week van</label>
										<input type="number" id="weekStart" name="weekStart" min="1" max="52" />
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="weekEnd">Week tot</label>
										<input type="number" id="weekEnd" name="weekEnd" min="1" max="52" />
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="datum">Datum</label>
										<input type="date" id="datum" name="datum" />
									</div>
									<div class="teacherDashboard__filter-group teacherDashboard__filter-group--full">
										<button type="submit" class="teacherDashboard__filter-button">
											Toepassen
										</button>
									</div>
								</form>
							</div>
							<div className="teacherDashboard__table">
								<table className="teacherDashboard__table-element">
									<thead>
										<tr>
											<th>Studentnummer</th>
											<th>Aanwezigheid</th>
											<th>Rooster</th>
											<th>Week</th>
											<th>Jaar</th>
											<th>Percentage</th>
											<th>Categorie</th>
											<th>Gestopt?</th>
										</tr>
									</thead>
									<tbody>
										{data.map((student, index) => {
											const percentage = student.percentage ?? 0;
											const categorie = getCategorie(percentage);
											const percentageClass = getPercentageClass(percentage);

											return (
												<tr key={index}>
													<td>{student.studentnummer}</td>
													<td>{student.aanwezigheid}</td>
													<td>{student.roosterminuten}</td>
													<td>{student.week ?? "-"}</td>
													<td>{student.jaar ?? "2025"}</td>
													<td className={`percentage ${percentageClass}`}>{percentage}%</td>
													<td className={percentageClass}>{categorie}</td>
													<td>
														<input
															type="checkbox"
															name={`gestopt-${student.studentnummer}`}
															className="teacherDashboard__checkbox"
															defaultChecked={student.gestopt ?? false}
														/>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherDashboard;
