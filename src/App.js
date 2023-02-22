import React from "react";
import "./App.css";

//importing pdf file
import pdfFile from "./assets/book.pdf";

//importing components
import PdfViewer from "./components/PdfViewer";




export default function App() {
   return (
    <div className="main-container">

      <PdfViewer pdfFile={pdfFile}/>
    </div>
  );
}
