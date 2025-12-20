import React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import MainContent from "./MainContent.jsx";
import { Container } from "@mui/material";

function App() {

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					width: "100vw",
				}}
			>
				<Container maxWidth="xl">
					<MainContent />
				</Container>
			</div>
		</>
	);
}

export default App;