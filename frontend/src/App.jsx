import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
//import "./styles/global.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SpreadsheetImport from "./components/dashboard/SpreadsheetImport";

import "./App.css";

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<DashboardPage />} /> {/* Hoofd dashboard route */}
        		<Route path="/import" element={<SpreadsheetImport />} />
			</Routes>
		</Router>
	);
}

export default App;
