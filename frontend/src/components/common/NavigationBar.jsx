import React, { useState } from "react";
import { Link } from "react-router-dom"; // Toevoegen
import "./NavigationBar.css";
import "./Buttons.css";

const Navbar = () => {
	//state die bijhoudt of het mobiele menu open of dicht is
	const [menuOpen, setMenuOpen] = useState(false);

	//deze functie togglet de waarde van menuOpen (true/false)
	//hierdoor kunnen we het mobiele menu in- of uitschuiven
	const toggleMenu = () => {
		//deze regel zorgt ervoor dat de waarde van menuOpen wordt omgedraaid (dicht / open)
		setMenuOpen(!menuOpen);
	};

	return (
		<nav className="navbar">
			<div className="navbar__container">
				<div className="navbar__start">
					<span className="navbar__brand">AARDATA</span>
					<a className="navbar__button" href="#">
						Student
					</a>
					<a className="navbar__button" href="#">
						Docent
					</a>
				</div>
				<div className="navbar__end">
					<Link className="navbar__button" to="/import">
						Importeer Spreadsheet
					</Link>
				</div>

				{/* als je hierop klikt, roep je toggleMenu aan */}
				<a className="navbar__hamburger" onClick={toggleMenu}>
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
			{/* deze div schuift van rechts naar links in beeld als menuOpen true is */}
			<div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
				<a>Student</a>
				<a>Docent</a>
				<Link to="/import">Importeer Spreadsheet</Link>
			</div>
		</nav>
	);
};

export default Navbar;
