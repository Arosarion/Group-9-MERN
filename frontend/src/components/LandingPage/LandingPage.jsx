import './LandingPage.css';

function LandingPage() {
  return (
    <>
      <div className="stars" />
      <header>
        <button className="topButton settingsButton">Settings</button>
        <button className="topButton logoutButton">Log Out</button>
        <div className="welcomeContainer">
          <div className="welcome">
            <h1>Welcome, Person!</h1>
            <p>Choose a topic below to begin learning.</p>
          </div>
        </div>
      </header>
      <main>
        <div className="cardContainer">
          <a href="/tools" className="card tools">
            <div className="overlay">
              <h2>Medical Tools</h2>
              <p>Learn about the tools used by healthcare professionals.</p>
            </div>
          </a>
          <a href="/organs" className="card organs">
            <div className="overlay">
              <h2>Human Organs</h2>
              <p>Explore the body's internal organs.</p>
            </div>
          </a>
          <a href="/bones" className="card bones">
            <div className="overlay">
              <h2>Human Bones</h2>
              <p>Learn the skeletal system.</p>
            </div>
          </a>
          <a href="/quiz" className="card quiz">
            <div className="overlay">
              <h2>Quiz</h2>
              <p>Test your knowledge.</p>
            </div>
          </a>
        </div>
      </main>
    </>
  );
}

export default LandingPage;