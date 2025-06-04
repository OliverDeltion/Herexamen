import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__section">
				<a href="#">Student</a>
				<a href="#">Docent</a>
				<a href="#">Mozartlaan 15</a>
				<a href="#">8031 AA Zwolle</a>
				<a href="#">+31 038 850 3000</a>
			</div>

			<div className="footer__section">
				<a href="#">Groepen</a>
				<a href="#">Studenten</a>
				<a href="#">Importeer Stylesheet</a>
			</div>

			<div className="footer__section">
				<a href="#">Privacybeleid</a>
				<a href="#">Gebruiksvoorwaarden</a>
				<a href="#">Cookies</a>
			</div>
		</footer>
	);
};

export default Footer;
