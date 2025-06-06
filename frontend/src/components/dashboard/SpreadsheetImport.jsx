import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";


const SpreadsheetImport = () => {
    const [fileName, setFileName] = useState("");
    const [data, setData] = useState([]);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);
        fileUpload(file);
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
            setData(jsonData);
        };
        reader.readAsBinaryString(file);
    };

    const fileUpload = (file) => {
        const form = new FormData();
        form.append('file', file);
        axios.post('http://localhost:3000/api/upload', form )
        console.log(file)
    }




    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Spreadsheet importeren</h2>
            <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                style={{ margin: "1rem 0" }}
            />
            {fileName && <div><strong>Bestand:</strong> {fileName}</div>}
            {data.length > 0 && (
                <div style={{ marginTop: "2rem", overflowX: "auto" }}>
                    <h4>Voorbeeld van de data:</h4>
                    <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
                        <tbody>
                            {data.slice(0, 10).map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td
                                            key={j}
                                            style={{
                                                border: "1px solid #ccc",
                                                padding: "0.4rem 0.8rem",
                                                background: i === 0 ? "#f7f7f7" : "#fff",
                                                fontWeight: i === 0 ? "bold" : "normal"
                                            }}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.length > 10 && (
                        <div style={{ color: "#888", fontSize: "0.9em", marginTop: "0.5rem" }}>
                            ...alleen de eerste 10 rijen getoond
                        </div>
                    )}
                </div>
            )}
            {!fileName && (
                <p style={{ color: "#888" }}>Kies een Excel- of CSV-bestand om te importeren.</p>
            )}
        </div>
    );
};

export default SpreadsheetImport;