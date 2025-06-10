import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__section">
				<a href="/Privacybeleid.pdf" target="_blank" rel="noopener noreferrer">Privacybeleid</a>
                <a href="/Gebruiksvoorwaarden.pdf" target="_blank" rel="noopener noreferrer">Gebruiksvoorwaarden</a>
			</div>

			<div className="footer__section">
				<a href="tel:+310388503000">+31 038 850 3000</a>
			</div>

			<div className="footer__section">
				<a href="https://www.google.com/maps/place/Mozartlaan+15,+8031+AA+Zwolle">Mozartlaan 15, 8031 AA Zwolle</a>
            </div>
		</footer>
	);
};

export default Footer;
