import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="lp-wrapper">
      {/* Sidebar */}
      <div className="lp-sidebar">
        <div className="lp-logo-triangle">▲</div>
        <div className="lp-nav-links">
          <div className="lp-nav-item active">
            <span className="lp-nav-icon">⌂</span>
            <span className="lp-nav-label">home</span>
          </div>
          <div className="lp-nav-item" onClick={() => navigate("/firstaid")}>
            <span className="lp-nav-icon">✚</span>
            <span className="lp-nav-label">aid</span>
          </div>
          <div className="lp-nav-item" onClick={() => navigate("/anatomy")}>
            <span className="lp-nav-icon">◎</span>
            <span className="lp-nav-label">learn</span>
          </div>
          <div className="lp-nav-item" onClick={() => navigate("/quiz")}>
            <span className="lp-nav-icon">?</span>
            <span className="lp-nav-label">quiz</span>
          </div>
          <div className="lp-nav-item" onClick={() => navigate("/profile")}>
            <span className="lp-nav-icon">👤</span>
            <span className="lp-nav-label">account</span>
          </div>
        </div>
        <div className="lp-nav-item lp-nav-logout" onClick={handleLogout}>
          <span className="lp-nav-icon">⏻</span>
          <span className="lp-nav-label">logout</span>
        </div>
      </div>

      {/* Kevin's original content */}
      <div className="lp-content">
        <div className="stars" />
        <header>
          <div className="welcomeContainer">
            <div className="welcome">
              <h1>MedSpace</h1>
              <p>Choose a topic below to begin learning.</p>
            </div>
          </div>
        </header>
        <main>
          <div className="cardContainer">
            <a href="/firstaid" className="card firstaid">
              <div className="overlay">
                <h2>First Aid</h2>
                <p>
                  Learn about life saving techniques and how to detect a person
                  in distress.
                </p>
              </div>
            </a>
            <a href="/anatomy" className="card anotomy">
              <div className="overlay">
                <h2>Anatomy</h2>
                <p>
                  Whether you want to freshen up or just casually learn, here
                  you can practice categorical human anatomy.
                </p>
              </div>
            </a>
            <a href="/quiz" className="card quiz">
              <div className="overlay">
                <h2>Practice and Quizzes</h2>
                <p>
                  Challenge your memorization and understanding of human body
                  among other fun stuff.
                </p>
              </div>
            </a>
            <a href="/temp" className="card leaderboard">
              <div className="overlay">
                <h2>Leaderboard</h2>
                <p>See how you rank against other students.</p>
              </div>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
