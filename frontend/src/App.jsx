import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
//import "./styles/global.css";
import { route } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar";
import Footer from "./components/common/Footer";
import SpreadsheetButton from "./components/common/SpreadsheetButton";
import FilterButton from "./components/common/FilterButton";
import DownloadButton from "./components/common/DownloadButton";
import DashboardPage from "./pages/DashboardPage";

import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<DashboardPage />} /> {/* Hoofd dashboard route */}
			</Routes>
		</Router>
	);
}

export default App;
