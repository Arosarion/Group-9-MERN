import { useState } from "react";

import AnatomyViewer from "../AnatomyViewer/AnatomyViewer";
import SideBar from "../Sidebar";
import "./ModelExplorer.css";

export default function ModelExplorer() {
  const [mode, setMode] = useState("both");
  const [resetSignal, setResetSignal] = useState(0);

  const resetView = () => {
    setResetSignal((currentSignal) => currentSignal + 1);
  };

  return (
    <div className="model-explorer-page">
      <SideBar />

      <main className="model-explorer-content">
        <section className="model-explorer-header">
          <p className="model-explorer-eyebrow">
            Interactive Learning
          </p>

          <h1>3D Human Anatomy Explorer</h1>

          <p className="model-explorer-description">
            Rotate, zoom, and inspect a three-dimensional model of the human
            body. Switch between the muscular and skeletal systems using the
            controls below.
          </p>
        </section>

        <section className="model-explorer-panel">
          <div className="model-explorer-toolbar">
            <div className="model-explorer-mode-buttons">
              <button
                type="button"
                className={`explorer-mode-button ${
                  mode === "both" ? "active" : ""
                }`}
                onClick={() => setMode("both")}
              >
                Both
              </button>

              <button
                type="button"
                className={`explorer-mode-button ${
                  mode === "muscles" ? "active" : ""
                }`}
                onClick={() => setMode("muscles")}
              >
                Muscles
              </button>

              <button
                type="button"
                className={`explorer-mode-button ${
                  mode === "skeleton" ? "active" : ""
                }`}
                onClick={() => setMode("skeleton")}
              >
                Skeleton
              </button>
            </div>

          </div>

          <AnatomyViewer
            mode={mode}
            resetSignal={resetSignal}
            onReset={resetView}
            />
        </section>

        <section className="model-explorer-help">
          <article className="explorer-help-card">
            <span className="explorer-help-number">01</span>
            <h2>Rotate</h2>
            <p>
              Hold the left mouse button and drag to inspect the models from
              different angles.
            </p>
          </article>

          <article className="explorer-help-card">
            <span className="explorer-help-number">02</span>
            <h2>Zoom and Move</h2>
            <p>
              Scroll to zoom. Hold the right mouse button and drag to move the
              camera toward an area such as the head.
            </p>
          </article>

          <article className="explorer-help-card">
            <span className="explorer-help-number">03</span>
            <h2>Compare</h2>
            <p>
              Display both systems together or isolate the muscles and
              skeleton individually.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}