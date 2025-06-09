import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import "./ExportButton.css";

const ExportButton = ({ studentData, filteredWeeks, chartRef, infoRef, summaryRef }) => {
    const handleExport = async () => {
        const doc = new jsPDF();
        orientation: "landscape";
        unit: "px";
        format: [842, 595],
         doc.setFontSize(20);
        doc.text("AARdata PDF", 20, 20);
         doc.setFontSize(16);
        doc.text(`Naam: ${studentData.naam || "Onbekend"}`, 20, 40);
        doc.text(`Studentnummer: ${studentData.studentNumber || "Onbekend"}`, 20, 50);

        let y = 60;
        for (const week of filteredWeeks) {
            const perc = week.roosterminuten
                ? ((week.aanwezigheid / week.roosterminuten) * 100).toFixed(1)
                : 0;

            doc.text(`Week ${week.week} - Jaar ${week.jaar}`, 20, y);
            y += 10;
            doc.text(`Aanwezigheid: ${week.aanwezigheid} min`, 20, y);
            y += 10;
            doc.text(`Rooster: ${week.roosterminuten} min`, 20, y);
            y += 10;
            doc.text(`Percentage: ${perc}%`, 20, y);
            y += 15;
        }

                // Informatie exporteren met html2canvas
        if (infoRef?.current) {
            const canvas = await html2canvas(infoRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addPage();
            doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        }

                // Samenvatting exporteren met html2canvas
        if (summaryRef?.current) {
            const canvas = await html2canvas(summaryRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addPage();
            doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        }

        // Chart exporteren met html2canvas 
        if (chartRef?.current) {
            const canvas = await html2canvas(chartRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addPage();
            doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        }

        doc.save("rapport.pdf");
    };

    return (
        <button className="export-button" onClick={handleExport}>
            Exporteer PDF
        </button>
    );
};

export default ExportButton;
