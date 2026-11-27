// Esto Responde JSON, o descarga PDF o Excel 
// si la ruta trae ?formato=pdf o ?formato=excel

const nombreArchivo = (titulo) =>
    titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const enviarExcel = async (res, { titulo, columnas, filas }) => {
    const ExcelJS = require("exceljs");
    const libro = new ExcelJS.Workbook();
    const hoja = libro.addWorksheet(titulo.slice(0, 31));
    hoja.columns = columnas.map((c) => ({
        header: c.titulo,
        key: c.clave,
        width: 22
    }));
    filas.forEach((fila) => hoja.addRow(fila));
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument" +
        ".spreadsheetml.sheet"
    );
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + nombreArchivo(titulo) + ".xlsx"
    );
    await libro.xlsx.write(res);
    res.end();
};

const enviarPdf = (res, { titulo, columnas, filas }) => {
    const PDFDocument = require("pdfkit");
    const documento = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + nombreArchivo(titulo) + ".pdf"
    );
    documento.pipe(res);
    documento.fontSize(16).text(titulo);
    documento.moveDown();
    documento.fontSize(10);
    documento.text(columnas.map((c) => c.titulo).join(" | "));
    documento.moveDown(0.5);
    filas.forEach((fila) => {
        documento.text(
            columnas.map((c) => String(fila[c.clave] ?? "")).join(" | ")
        );
    });
    documento.end();
};

// Sin formato responde JSON; con ?formato=pdf o ?formato=excel
// descarga el archivo (RF30)
const enviarReporte = async (res, formato, reporte) => {
    if (!formato) {
        return res.json(reporte);
    }
    if (formato === "excel") {
        return enviarExcel(res, reporte);
    }
    if (formato === "pdf") {
        return enviarPdf(res, reporte);
    }
    res.status(400).json({
        mensaje: "Formato no valido: use pdf o excel"
    });
};

module.exports = { enviarReporte };

