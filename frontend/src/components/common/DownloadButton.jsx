import React from "react";
import "./Buttons.css";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />;

const DownloadButton = () => {
	return (
		<button className="downloadButton">
			<i className="fa fa-download"></i> Download
		</button>
	);
};

export default DownloadButton;
