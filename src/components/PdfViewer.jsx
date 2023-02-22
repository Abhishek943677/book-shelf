import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import React from "react";
// react-pdf-viewer part
import { Worker, Viewer, ProgressBar } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

//default layout for pdf
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import pdfFilePath from "../assets/book.pdf";
import { useState } from "react";
import { useEffect } from "react";

export default function PdfViewer({ pdfFile }) {
  const renderToolbar = (Toolbar) => (
    <Toolbar>
      {(slots) => {
        const {
          CurrentPageInput,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          ShowSearchPopover,
          Zoom,
          ZoomIn,
          ZoomOut,
          Rotate,
          SwitchTheme,
        } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <div style={{ padding: "0px 2px" }}>
              <ShowSearchPopover />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <ZoomOut />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Zoom />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <ZoomIn />
            </div>
            <div
              style={{
                padding: "0px 2px",
                margin: "auto",
                display: "flex",
                border: "2px",
                borderBlock: "black",
              }}
            >
              <div style={{ padding: "0px 2px" }}>
                <GoToPreviousPage />
              </div>
              <div
                style={{
                  padding: "0px 2px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <CurrentPageInput />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <GoToNextPage />
              </div>
            </div>
            <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
              <EnterFullScreen />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Rotate />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <SwitchTheme />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });

  const [file, setFile] = useState(pdfFilePath);
  // console.log(file);

  function onFileChange(event) {
    console.log("input is taken");

    const fileFromWeb = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
      // console.log(reader.result)
      setFile(reader.result);
    };
    reader.readAsDataURL(fileFromWeb); //important, it gives base64 data to file
  }

  const refreshPage = () => {
    window.location.reload();
    console.log("reloaded");
    return false;
  };
  useEffect(() => {
    console.log("showing new file");
  }, [file]);

  return (
    <div className="main-container">
      <div className="input-div">
        <label htmlFor="file" className="html-text">
          Load from file:
        </label>
        <input onChange={onFileChange} type="file" accept="application/pdf" />
        <button onClick={refreshPage}>refresh page</button>
      </div>
      <div className="pdf-div">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
          <Viewer
            fileUrl={file}
            plugins={[defaultLayoutPluginInstance]}
            renderLoader={(percentages) => (
              <div className="message-div">
                <div className="progress-bar-div">
                  {/* <ProgressBar progress={Math.round(percentages)} /> */}
                  <div className="lds-hourglass"></div>
                </div>
                <p> If reloading takes too much time then refresh the page</p>
                <button onClick={refreshPage} className="refresh-button">
                  refresh page
                </button>
              </div>
            )}
          ></Viewer>
        </Worker>
      </div>
    </div>
  );
}
