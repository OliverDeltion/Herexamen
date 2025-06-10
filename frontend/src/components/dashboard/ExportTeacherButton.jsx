import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import "./ExportTeacherButton.css";

const ExportTeacherButton = ({ infoRef, tableRef }) => {
    const handleExport = async () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Overzicht van de studenten", 20, 20);

        // Informatie exporteren van de infoRef en tableRef in het teacher dashboard
        let firstPage = true;
        const exportSection = async (ref) => {
            if (ref?.current) {
                const originalHeight = ref.current.style.height;
                const originalOverflow = ref.current.style.overflow;

                ref.current.style.height = "auto"; // Zorg dat de volledige inhoud zichtbaar is
                ref.current.style.overflow = "visible"; // Zorg dat er geen overflow is

                await new Promise((resolve) => setTimeout(resolve, 100)); // Timeout om de tijdelijke stijl toe te passen

                const canvas = await html2canvas(ref.current, { scale: 2 });
                const imgData = canvas.toDataURL("image/png");
                const imgProps = doc.getImageProperties(imgData);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                doc.addPage();
                doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

                ref.current.style.height = originalHeight; // Herstel de originele hoogte
                ref.current.style.overflow = originalOverflow; // Herstel de originele overflow
            }
        };

        await exportSection(infoRef);
        await exportSection(tableRef);

        doc.save("rapport.pdf");
    };

    return (
        <button className="export-button" onClick={handleExport}>
            Exporteer PDF
        </button>
    );
};

export default ExportTeacherButton;
