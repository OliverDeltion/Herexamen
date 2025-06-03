import React from "react";
import "./NavigationBar.css"; // CSS-bestand importeren

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar__container">
				<div className="navbar__brand">AARDATA</div>
				<ul className="navbar__menu">
					<li>
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#">Overzicht</a>
					</li>
					<li>
						<a href="#">Contact</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
