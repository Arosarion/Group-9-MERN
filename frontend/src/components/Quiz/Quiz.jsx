import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Sidebar";
import "./Quiz.css";

const TOPICS = [
  { label: "Heart", slug: "heart" },
  { label: "Lungs", slug: "lungs" },
  { label: "Brain", slug: "brain" },
  { label: "Skeletal System", slug: "skeletal-system" },
  { label: "Muscular System", slug: "muscular-system" },
  { label: "Digestive System", slug: "digestive-system" },
  { label: "CPR", slug: "cpr" },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("select"); // select, playing, results
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // { correct, correctAnswer, explanation }
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startTime, setStartTime] = useState(null);

  const token = localStorage.getItem("token");

  const fetchQuestions = async (slug) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quizzes/${slug}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = await res.json();
      console.log("Questions fetched:", data); // ← add this
      if (!Array.isArray(data) || data.length === 0) {
        setError("No questions found for this topic.");
        setLoading(false);
        return;
      }
      setQuestions(data);
      setPhase("playing");
      setStartTime(Date.now());
      setCurrent(0);
      setScore(0);
      setAnswers([]);
    } catch (err) {
      console.error("Fetch error:", err); // ← add this
      setError("Failed to load questions. Please try again.");
    }
    setLoading(false);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    fetchQuestions(topic.slug);
  };

  const handleAnswer = async (choice) => {
    if (selected) return;
    setSelected(choice);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/game/check-answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            questionId: questions[current]._id,
            selectedAnswer: choice,
          }),
        },
      );
      const data = await res.json();
      setResult(data);
      if (data.correct) setScore((s) => s + 1);
      setAnswers((a) => [
        ...a,
        {
          question: questions[current].question,
          correct: data.correct,
          selected: choice,
          correctAnswer: data.correctAnswer,
        },
      ]);
    } catch {
      setError("Failed to check answer.");
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      saveScore();
      setPhase("results");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setResult(null);
    }
  };

  const saveScore = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          questionsAnswered: questions.length,
          correctCount: score,
          timeTakenSeconds: Math.round((Date.now() - startTime) / 1000),
          category: selectedTopic.label,
          quizType: "quiz",
        }),
      });
    } catch {
      console.error("Failed to save score");
    }
  };

  const restart = () => {
    setPhase("select");
    setSelectedTopic(null);
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setResult(null);
    setScore(0);
    setAnswers([]);
  };

  const q = questions[current];
  const accuracy =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="quiz-wrapper">
      <SideBar />
      <div className="quiz-main">
        <div className="quiz-topbar">
          <div className="quiz-topbar-left">
            <span className="quiz-triangle">▲</span>
            <span className="quiz-brand">
              <span className="quiz-brand-med">MED</span>
              <span className="quiz-brand-space">SPACE</span>
            </span>
          </div>
          <span className="quiz-topbar-label">Quiz</span>
        </div>

        {/* Topic selection */}
        {phase === "select" && (
          <div className="quiz-select">
            <div className="quiz-select-header">
              <div className="quiz-select-line"></div>
              <h2 className="quiz-select-title">SELECT A TOPIC</h2>
            </div>
            {error && <p className="quiz-error">{error}</p>}
            {loading ? (
              <p className="quiz-loading">Loading...</p>
            ) : (
              <div className="quiz-topic-grid">
                {TOPICS.map((topic) => (
                  <div
                    key={topic.slug}
                    className="quiz-topic-card"
                    onClick={() => handleTopicSelect(topic)}
                  >
                    <span className="quiz-topic-label">{topic.label}</span>
                    <span className="quiz-topic-arrow">→</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Playing */}
        {phase === "playing" && q && q.choices && (
          <div className="quiz-play">
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${(current / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="quiz-meta">
              <span className="quiz-meta-topic">{selectedTopic.label}</span>
              <span className="quiz-meta-count">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(questions.length).padStart(2, "0")}
              </span>
            </div>
            <div className="quiz-question-wrap">
              <p className="quiz-question">{q.question}</p>
              <div className="quiz-choices">
                {(q.choices || []).map((opt, i) => {
                  let cls = "quiz-choice";
                  if (selected) {
                    if (opt === result?.correctAnswer) cls += " correct";
                    else if (opt === selected && !result?.correct)
                      cls += " wrong";
                    else cls += " dimmed";
                  }
                  return (
                    <div
                      key={i}
                      className={cls}
                      onClick={() => handleAnswer(opt)}
                    >
                      <span className="quiz-choice-letter">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
              {result && (
                <div className="quiz-feedback">
                  {result.explanation && (
                    <p className="quiz-explanation">{result.explanation}</p>
                  )}
                  <button className="quiz-next-btn" onClick={handleNext}>
                    {current + 1 >= questions.length
                      ? "See Results →"
                      : "Next →"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {phase === "results" && (
          <div className="quiz-results">
            <div className="quiz-results-header">
              <div className="quiz-select-line"></div>
              <h2 className="quiz-select-title">RESULTS</h2>
            </div>
            <div className="quiz-score-display">
              <div className="quiz-score-num">
                {score}
                <span>/{questions.length}</span>
              </div>
              <div className="quiz-score-pct">{accuracy}% accuracy</div>
              <div className="quiz-score-topic">{selectedTopic.label}</div>
            </div>
            <div className="quiz-answers-review">
              {answers.map((a, i) => (
                <div
                  key={i}
                  className={`quiz-answer-row ${a.correct ? "correct" : "wrong"}`}
                >
                  <span className="quiz-answer-indicator">
                    {a.correct ? "✓" : "✗"}
                  </span>
                  <span className="quiz-answer-q">{a.question}</span>
                </div>
              ))}
            </div>
            <div className="quiz-results-btns">
              <button className="quiz-next-btn" onClick={restart}>
                Try Another Topic →
              </button>
              <button
                className="quiz-outline-btn"
                onClick={() => navigate("/home")}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
