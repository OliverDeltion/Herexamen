import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// in src/main.jsx of src/App.jsx
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/global.css";
import { route } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar";
import Footer from "./components/common/Footer";
import SpreadsheetButton from "./components/common/SpreadsheetButton";
import FilterButton from "./components/common/FilterButton";
import DownloadButton from "./components/common/DownloadButton";

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
