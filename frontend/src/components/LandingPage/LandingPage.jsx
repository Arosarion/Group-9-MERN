import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import SideBar from "../Sidebar";

function LandingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="lp-wrapper">
      <SideBar />

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
            <a href="/anatomy-explorer" className="card anatomyExplorer">
              <div className="overlay">
                <h2>Anatomy Explorer</h2>
                <p>
                  Interact with 3D models of the human body. Explore anatomy in
                  detail.
                </p>
              </div>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
