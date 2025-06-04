import React from "react";
import NavigationBar from "../common/NavigationBar";
import "./TeacherDashboard.css";
import "../../Global.css";
import "../common/Buttons.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const percentage = 75;
const TeacherDashboard = () => {
	return (
		<div>
			<div class="container">
				<div class="teacherDashboard">
					<div class="teacherDashboard__container">
						<div class="teacherDashboard__top">
							<div class="teacherDashboard__start">
								<h3>Gemaakte groepen</h3>
								<div class="teacherDashboard__groups">
									<div class="teacherDashboard__group">
										<div class="teacherDashboard__group-name">Groep 1</div>
										<div class="teacherDashboard__group-students">Aantal studenten: 5</div>
										<a class="teacherDashboard__group-edit">Bekijk Groep</a>
										<a class="teacherDashboard__group-delete">Verwijder Groep</a>
									</div>
									<div class="teacherDashboard__group">
										<div class="teacherDashboard__group-name">Group 1</div>
										<div class="teacherDashboard__group-students">Aantal studenten: 5</div>
										<a class="teacherDashboard__group-edit">Bekijk Groep</a>
										<a class="teacherDashboard__group-delete">Verwijder Groep</a>
									</div>
									<div class="teacherDashboard__group">
										<div class="teacherDashboard__group-name">Group 1</div>
										<div class="teacherDashboard__group-students">Aantal studenten: 5</div>
										<a class="teacherDashboard__group-edit">Bekijk Groep</a>
										<a class="teacherDashboard__group-delete">Verwijder Groep</a>
									</div>
									<div class="teacherDashboard__group">
										<div class="teacherDashboard__group-name">Groep 1</div>
										<div class="teacherDashboard__group-students">Aantal studenten: 5</div>
										<a class="teacherDashboard__group-edit">Bekijk Groep</a>
										<a class="teacherDashboard__group-delete">Verwijder Groep</a>
									</div>
								</div>
								<button class="teacherDashboard__button">Maak nieuwe groep aan</button>
							</div>
							<div class="teacherDashboard__end">
								<div class="teacherDashboard__diagram">
									<div style={{ width: 200, height: 200 }}>
										{/* <p>Gemiddelde aanwezigheid:</p> */}
										<CircularProgressbar
											value={percentage}
											text={`Algemeen\n${percentage}%`}
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
										<label for="weekStart">Week van</label>
										<input type="number" id="weekStart" name="weekStart" min="1" max="52" />
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="weekEnd">Week tot</label>
										<input type="number" id="weekEnd" name="weekEnd" min="1" max="52" />
									</div>
									<div class="teacherDashboard__filter-group">
										<label for="periode">Periode</label>
										<select id="periode" name="periode">
											<option value="">-- Kies --</option>
											<option value="1">Periode 1</option>
											<option value="2">Periode 2</option>
											<option value="3">Periode 3</option>
											<option value="4">Periode 4</option>
										</select>
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
							<div class="teacherDashboard__table">
								<table class="teacherDashboard__table-element">
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
										<tr>
											<td>st001</td>
											<td>300</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--goed">83%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
										<tr>
											<td>st002</td>
											<td>150</td>
											<td>360</td>
											<td>25</td>
											<td>2025</td>
											<td class="percentage percentage--kritiek">41%</td>
											<td>Excellent</td>
											<td>
												<input type="checkbox" name="gestopt-st002" class="teacherDashboard__checkbox" />
											</td>
										</tr>
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
