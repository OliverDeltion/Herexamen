import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
//import "./styles/global.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

import "./App.css";

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<DashboardPage />} /> {/* Hoofd dashboard route */}
			</Routes>
		</Router>
	);
}

export default App;
