import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import SideBar from "../Sidebar";

const topics = [
  {
    id: "01",
    title: "FIRST",
    sub: "AID",
    desc: "Learn about life saving techniques and how to detect a person in distress.",
    tags: ["Emergency", "First Aid"],
    color: "#c0392b",
    path: "/firstaid",
  },
  {
    id: "02",
    title: "HUMAN",
    sub: "ANATOMY",
    desc: "Whether you want to freshen up or just casually learn, practice categorical human anatomy.",
    tags: ["Anatomy", "Biology"],
    color: "#2980b9",
    path: "/anatomy",
  },
  {
    id: "03",
    title: "PRACTICE &",
    sub: "QUIZZES",
    desc: "Challenge your memorization and understanding of the human body among other fun stuff.",
    tags: ["Quiz", "Challenge"],
    color: "#27ae60",
    path: "/quiz",
  },
  {
    id: "04",
    title: "3D",
    sub: "EXPLORER",
    desc: "Interact with a 3D model of the human body. Rotate, zoom and inspect anatomy in detail.",
    tags: ["3D", "Interactive"],
    color: "#8e44ad",
    path: "/anatomy-explorer",
  },
];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Student";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const t = topics[current];

  return (
    <div className="lp-container">
      <SideBar />

      {/* Main content */}
      <div className="lp-main">
        <div className="lp-accent-bar"></div>

        <div className="lp-topbar">
          <div className="lp-topbar-left">
            <span className="lp-topbar-triangle">▲</span>
            <div className="lp-topbar-brand">
              <span className="lp-brand-med">MED</span>
              <span className="lp-brand-space">SPACE</span>
            </div>
          </div>
          <div className="lp-topbar-right">
            <div className="lp-avatar">{username.charAt(0).toUpperCase()}</div>
            <span className="lp-username">{username.split(" ")[0]}</span>
          </div>
        </div>

        {/* Layout */}
        <div className="lp-layout">
          {/* Left info panel */}
          <div className="lp-info">
            <div className="lp-eyebrow">
              <div className="lp-eyebrow-line"></div>
              <span>Topic {t.id}</span>
            </div>
            <h2 className="lp-topic-title">
              {t.title}
              <br />
              <span style={{ color: t.color }}>{t.sub}</span>
            </h2>
            <p className="lp-topic-desc">{t.desc}</p>
            <div className="lp-tags">
              {t.tags.map((tag) => (
                <span key={tag} className="lp-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="lp-nav-controls">
              <button
                className="lp-nav-btn"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
              >
                ←
              </button>
              <span className="lp-counter">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(topics.length).padStart(2, "0")}
              </span>
              <button
                className="lp-nav-btn"
                onClick={() =>
                  setCurrent((c) => Math.min(topics.length - 1, c + 1))
                }
                disabled={current === topics.length - 1}
              >
                →
              </button>
            </div>
            <button className="lp-cta" onClick={() => navigate(t.path)}>
              EXPLORE TOPIC →
            </button>
          </div>

          {/* Card stack */}
          <div className="lp-stack-area">
            <div className="lp-stack">
              {topics.map((topic, i) => {
                const offset = i - current;
                return (
                  <div
                    key={topic.id}
                    className="lp-card"
                    onClick={() => setCurrent(i)}
                    style={{
                      left: `${10 + offset * 18}px`,
                      top: `${10 + Math.abs(offset) * 8}px`,
                      zIndex: topics.length - Math.abs(offset),
                      opacity:
                        offset === 0
                          ? 1
                          : Math.max(0.15, 0.5 - Math.abs(offset) * 0.12),
                      transform: `rotate(${offset * 2.5}deg) scale(${offset === 0 ? 1 : Math.max(0.82, 0.93 - Math.abs(offset) * 0.04)})`,
                      borderColor:
                        offset === 0 ? topic.color : "rgba(255,255,255,0.2)",

                      background:
                        offset === 0 ? topic.color + "11" : "rgba(4,1,10,0.6)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      className="lp-card-glow"
                      style={{
                        color: topic.color,
                        opacity: offset === 0 ? 0.15 : 0.04,
                      }}
                    >
                      {topic.id}
                    </div>
                    <div className="lp-card-content">
                      <div className="lp-card-num">Topic {topic.id}</div>
                      <div className="lp-card-title">
                        {topic.title}
                        <br />
                        {topic.sub}
                      </div>
                      <div className="lp-card-tag">{topic.tags[0]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Peek labels */}
            <div className="lp-peeks">
              {topics.map((topic, i) => (
                <div
                  key={topic.id}
                  className={`lp-peek ${i === current ? "active" : ""}`}
                  onClick={() => {
                    console.log(
                      "clicked card",
                      i,
                      "current",
                      current,
                      "path",
                      topic.path,
                    );
                    if (i === current) {
                      navigate(topic.path);
                    } else {
                      setCurrent(i);
                    }
                  }}
                >
                  {topic.id}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
