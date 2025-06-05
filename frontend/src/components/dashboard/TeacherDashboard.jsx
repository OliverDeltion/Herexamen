import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
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

	// usestates voor de filters
	const [studentnummerFilter, setStudentnummerFilter] = useState("");
	const [categorieFilter, setCategorieFilter] = useState("");
	const [weekStart, setWeekStart] = useState("");
	const [weekEnd, setWeekEnd] = useState("");
	const [yearFilter, setYearFilter] = useState("");

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

	// filteren van de data op basis van de filters
	const filteredData = data.filter((student) => {
		const matchStudentnummer = !studentnummerFilter.trim() || student.studentnummer.toString().includes(studentnummerFilter.trim());

		// percentage filter
		const percentage = student.percentage ?? 0;
		// categorie filter
		const categorie = getCategorie(percentage);
		const matchCategorie = !categorieFilter || categorie === categorieFilter;

		// week filter
		const studentWeek = student.week ?? null;

		const weekStartNumber = parseInt(weekStart, 10);
		const weekEndNumber = parseInt(weekEnd, 10);

		const matchWeekStart = !weekStart || (studentWeek && studentWeek >= weekStartNumber);
		const matchWeekEnd = !weekEnd || (studentWeek && studentWeek <= weekEndNumber);

		// jaar filter
		const matchYear = !yearFilter || (student.jaar && student.jaar.toString() === yearFilter.toString());

		// voeg meer filters hierna toe indien nodig
		return matchStudentnummer && matchCategorie && matchWeekStart && matchWeekEnd && matchYear;
	});

	const filteredAveragePercentage = filteredData.length
		? Math.round(filteredData.reduce((acc, student) => acc + (student.percentage || 0), 0) / filteredData.length)
		: 0;

	return (
		<div class="bg-color">
			<div class="container">
				<div class="teacherDashboard">
					<div class="teacherDashboard__container">
						<div class="teacherDashboard__top">
							<div class="teacherDashboard__start">
								<div class="teacherDashboard__start-header">
									<h3>Programmeerschool Docent Dashboard</h3>
									{/* <button>test</button> */}
								</div>
								<div className="teacherDashboard__groups">
									{/* voorbeeld van groepen, deze zou normaal uit de database komen
									{[1, 2, 3, 4].map((group) => (
										<div className="teacherDashboard__group" key={group}>
											<div className="teacherDashboard__group-name">Groep {group}</div>
											<div className="teacherDashboard__group-students">Aantal studenten: 5</div>
											<a className="teacherDashboard__group-edit">Bekijk Groep</a>
											<a className="teacherDashboard__group-delete">Verwijder Groep</a>
										</div>
									))} */}
								</div>
								{/* <button class="teacherDashboard__button">Maak nieuwe groep aan</button> */}
							</div>
							<div class="teacherDashboard__end">
								<div class="teacherDashboard__diagram">
									<div style={{ width: 250, height: 250 }}>
										<CircularProgressbar
											//percentage van de functie hier boven
											value={filteredAveragePercentage}
											text={`Algemeen\n${filteredAveragePercentage}%`}
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
								<form
									class="teacherDashboard__filter-form"
									onSubmit={(e) => {
										e.preventDefault();
									}}
								>
									<div class="teacherDashboard__filter-group">
										<label for="periode">Studentnummer</label>
										<input
											type="text"
											id="studentnummer"
											name="studentnummer"
											value={studentnummerFilter}
											onChange={(e) => setStudentnummerFilter(e.target.value)}
										/>
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="weekStart">Week van</label>
										<input
											type="number"
											id="weekStart"
											name="weekStart"
											min="1"
											max="52"
											value={weekStart}
											onChange={(e) => setWeekStart(e.target.value)}
										/>
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="weekEnd">Week tot</label>
										<input
											type="number"
											id="weekEnd"
											name="weekEnd"
											min="1"
											max="52"
											value={weekEnd}
											onChange={(e) => setWeekEnd(e.target.value)}
										/>
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="categorie">Categorie</label>
										<select id="categorie" name="categorie" value={categorieFilter} onChange={(e) => setCategorieFilter(e.target.value)}>
											<option value="">Alle Categorieën</option>
											<option value="Geen aanwezigheid">Geen aanwezigheid</option>
											<option value="Perfect">Perfect</option>
											<option value="Excellent">Excellent</option>
											<option value="Goed">Goed</option>
											<option value="Voldoende">Voldoende</option>
											<option value="Onvoldoende">Onvoldoende</option>
											<option value="Fail">Fail</option>
										</select>
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="datum">Jaar</label>
										<input type="year" id="jaar" name="jaar" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} />
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
										{filteredData.map((student, index) => {
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
