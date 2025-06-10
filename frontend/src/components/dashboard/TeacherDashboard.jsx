import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./TeacherDashboard.css";
import "../../Global.css";
import "../common/Buttons.css";
import { CircularProgressbar } from "react-circular-progressbar";
import ExportTeacherButton from "./ExportTeacherButton";
import "react-circular-progressbar/dist/styles.css";

const categoryThresholds = [
	{ min: 100, label: "Perfect" },
	{ min: 95, label: "Excellent" },
	{ min: 80, label: "Goed" },
	{ min: 65, label: "Voldoende" },
	{ min: 50, label: "Onvoldoende" },
	{ min: 1, label: "Kritiek" },
	{ min: 0, label: "Fail" },
];

const getCategorie = (percentage) => {
	const match = categoryThresholds.find((grens) => percentage >= grens.min);
	return match ? match.label : "Fail";
};

const percentageClassThresholds = [
	{ min: 100, className: "percentage--perfect" },
	{ min: 95, className: "percentage--excellent" },
	{ min: 80, className: "percentage--goed" },
	{ min: 65, className: "percentage--voldoende" },
	{ min: 50, className: "percentage--onvoldoende" },
	{ min: 1, className: "percentage--kritiek" },
	{ min: 0, className: "percentage--fail" },
];

const getPercentageClass = (percentage) => {
	const match = percentageClassThresholds.find((grens) => percentage >= grens.min);
	return match ? match.className : "percentage--fail";
};

const TeacherDashboard = () => {
	// studentenlijst
	const [data, setData] = useState([]);

	const [averagePercentage, setAveragePercentage] = useState(0);

	// usestates voor de filters
	const [studentnummerFilter, setStudentnummerFilter] = useState("");
	const [categorieFilter, setCategorieFilter] = useState("");
	const [weekStart, setWeekStart] = useState("");
	const [weekEnd, setWeekEnd] = useState("");
	const [yearFilter, setYearFilter] = useState("");
	const [singleWeek, setSingleWeek] = useState("");

	const resetFilters = () => {
		setStudentnummerFilter("");
		setCategorieFilter("");
		setWeekStart("");
		setWeekEnd("");
		setYearFilter("");
		setSingleWeek("");
	};

	// useRef gebruiken voor de PDF export - Nirmin
	const infoRef = useRef(null);
	const tableRef = useRef(null);

	//studenten ophalen API
	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get("http://localhost:3000/api/get/students");
				const students = response.data;
				setData(students);
				if (students.length > 0) {
					// alle percentages optellen
					const total = students.reduce((acc, student) => acc + (student.percentage || 0), 0);
					const avg = total / students.length;
					setAveragePercentage(Math.round(avg));
				}
			} catch (error) {
				console.error("Fout bij het ophalen van studenten:", error);
			}
		}
		fetchData();
	}, []);

	// filteren van de data op basis van de filters
	const filteredData = data.filter((student) => {
		const matchStudentnummer = !studentnummerFilter.trim() || student.studentnummer.toString().includes(studentnummerFilter.trim());

		const matchYear = !yearFilter || (student.jaar && student.jaar.toString() === yearFilter.toString());

		const studentWeek = student.week ?? null;

		let matchWeekStart = true;
		let matchWeekEnd = true;

		if (singleWeek) {
			const single = parseInt(singleWeek, 10);
			matchWeekStart = studentWeek === single;
			matchWeekEnd = true; // wordt genegeerd
		} else {
			const weekStartNumber = parseInt(weekStart, 10);
			const weekEndNumber = parseInt(weekEnd, 10);
			matchWeekStart = !weekStart || (studentWeek && studentWeek >= weekStartNumber);
			matchWeekEnd = !weekEnd || (studentWeek && studentWeek <= weekEndNumber);
		}

		const percentage = student.percentage ?? 0;
		const categorie = getCategorie(percentage);
		const matchCategorie = !categorieFilter || categorie === categorieFilter;

		return matchStudentnummer && matchYear && matchWeekStart && matchWeekEnd && matchCategorie;
	});

	// percentage gefilterde studenten
	const filteredAveragePercentage = filteredData.length
		? // reduce is de optel functie
		  //	acc is tussenstand van de som
		  Math.round(filteredData.reduce((acc, student) => acc + (student.percentage || 0), 0) / filteredData.length)
		: 0;

	const [groepen, setGroepen] = useState({});

	// studenten toevoegen aan groepen
	const voegStudentToeAanGroep = (groepNaam, studentnummer) => {
		setGroepen((prev) => {
			//set voorkomt dubbele input
			const huidigeGroep = new Set(prev[groepNaam] || []);
			huidigeGroep.add(studentnummer);
			return {
				// vorige groepen behouden
				...prev,
				// nieuwe groep toevoegen of overschrijven
				[groepNaam]: Array.from(huidigeGroep),
			};
		});
	};

	return (
		<div className="bg-color">
			<div className="container">
				<div className="teacherDashboard">
					<div className="teacherDashboard__container">
						<div className="teacherDashboard__top">
							<div className="teacherDashboard__start" ref={infoRef}>
								<div className="teacherDashboard__start-header">
									<h3>Docent Dashboard</h3>
									<div className="navbar__end">
										<a className="navbar__button" href="/import">
											Importeer Spreadsheet
										</a>
									</div>
								</div>
								<div className="teacherDashboard__kpi">
									<h4>
										<i className="fas fa-chart-bar"></i> Overzicht
									</h4>
									<ul>
										<li>
											<i className="fas fa-user-graduate"></i> Unieke studenten:{" "}
											<strong>{new Set(filteredData.map((s) => s.studentnummer)).size}</strong>
										</li>
										<li>
											<i className="fas fa-calendar-week"></i> Aantal weken:{" "}
											<strong>{new Set(filteredData.map((s) => s.week)).size}</strong>
										</li>
										<li>
											<i className="fas fa-percent"></i> Gem. aanwezigheid: <strong>{filteredAveragePercentage}%</strong>
										</li>
										<li>
											<i className="fas fa-exclamation-triangle"></i> Fails:{" "}
											<strong>{filteredData.filter((s) => getCategorie(s.percentage ?? 0) === "Fail").length}</strong>
										</li>
										<li>
											<i className="fas fa-chart-line"></i> Gem. aanwezigheid totaal: <strong>{averagePercentage}%</strong>
										</li>
										<li>
											<i className="fas fa-file-alt"></i>

											{/* Export pdf - Nirmin */}
											<ExportTeacherButton
												infoRef={infoRef}
												tableRef={tableRef}
											/> 
										</li>
									</ul>
								</div>
							</div>
							<div className="teacherDashboard__end">
								<div className="teacherDashboard__diagram">
									<div style={{ width: "100%", maxWidth: 250, height: "auto" }}>
										<CircularProgressbar
											value={filteredAveragePercentage}
											text={
												<>
													<tspan x="50%" dy="0em">
														Aanwezigheid
													</tspan>
													<tspan x="50%" dy="1.2em">
														{filteredAveragePercentage}%
													</tspan>
												</>
											}
											styles={{
												text: {
													fontSize: "10px",
													lineHeight: "1.3",
													whiteSpace: "pre-line",
													dominantBaseline: "middle",
													textAnchor: "middle",
												},
												path: { stroke: "#3498db" },
												trail: { stroke: "#ccc" },
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="teacherDashboard__bottom">
							<div className="teacherDashboard__filter">
								<form
									className="teacherDashboard__filter-form"
									onSubmit={(e) => {
										e.preventDefault();
									}}
								>
									<div className="teacherDashboard__filter-group">
										<label htmlFor="periode">Studentnummer</label>
										<input
											type="text"
											id="studentnummer"
											name="studentnummer"
											value={studentnummerFilter}
											onChange={(e) => setStudentnummerFilter(e.target.value)}
										/>
									</div>
									<div className="teacherDashboard__filter-group">
										<label htmlFor="singleWeek">Week</label>
										<div className="teacherDashboard__week-navigator">
											<button
												type="button"
												onClick={() => {
													const currentWeek = parseInt(singleWeek || "0", 10);
													if (currentWeek > 1) {
														setSingleWeek(currentWeek - 1);
													}
												}}
											>
												←
											</button>

											<input
												type="number"
												id="singleWeek"
												min="1"
												max="52"
												value={singleWeek}
												onChange={(e) => {
													const value = Math.max(1, Math.min(52, parseInt(e.target.value, 10) || ""));
													setSingleWeek(value);
												}}
											/>

											<button
												type="button"
												onClick={() => {
													const currentWeek = parseInt(singleWeek || "0", 10);
													if (currentWeek < 52) {
														setSingleWeek(currentWeek + 1);
													}
												}}
											>
												→
											</button>
										</div>
									</div>

									<div className="teacherDashboard__filter-group">
										<label htmlFor="weekStart">Week van</label>
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
									<div className="teacherDashboard__filter-group">
										<label htmlFor="weekEnd">Week tot</label>
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
									<div className="teacherDashboard__filter-group">
										<label htmlFor="categorie">Categorie</label>
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
									<div className="teacherDashboard__filter-group">
										<label htmlFor="datum">Jaar</label>
										<input type="number" id="jaar" name="jaar" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} />
									</div>
									<div className="teacherDashboard__filter-actions">
										<button type="button" className="navbar__button" onClick={resetFilters}>
											Reset alle filters
										</button>
									</div>
								</form>
							</div>
							<div className="teacherDashboard__table"  ref={tableRef}>
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
											<th>Groep</th>
										</tr>
									</thead>
									<tbody className="teacherDashboard__table-body">
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
													<td>
														<select
															onChange={(e) => {
																if (e.target.value) {
																	voegStudentToeAanGroep(e.target.value, student.studentnummer);
																	e.target.value = "";
																}
															}}
														>
															<option value="">Kies groep</option>
															<option value="Groep A">Groep A</option>
															<option value="Groep B">Groep B</option>
															<option value="Groep C">Groep C</option>
														</select>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
						<h3>Groepenoverzicht</h3>
						<p>
							<em>Let op: groepen zijn tijdelijk en gaan verloren bij herladen.</em>
						</p>
						<div className="teacherDashboard__groups">
							{/* groep object wordt aangemaakt, en gevuld met 2 waardes: groepnaam en studentnummers */}
							{Object.entries(groepen).map(([groepNaam, studentnummers]) => {
								//
								const pogingen = data.filter((s) => studentnummers.includes(s.studentnummer));
								if (pogingen.length === 0) return null;

								const gemiddelde = Math.round(pogingen.reduce((acc, s) => acc + (s.percentage || 0), 0) / pogingen.length);

								const uniekeStudenten = [...new Set(pogingen.map((s) => s.studentnummer))];

								return (
									<div key={groepNaam} className="teacherDashboard__group">
										<h4>{groepNaam}</h4>
										<p>Aantal unieke studenten: {uniekeStudenten.length}</p>
										<p>
											Gemiddelde aanwezigheid: <strong>{gemiddelde}%</strong>
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherDashboard;
