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
		<>
			<NavigationBar />
			<DownloadButton />
			<FilterButton />
			<SpreadsheetButton />
			{/* <div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p> */}
			<Footer />;
		</>
	);
}

export default App;
