import "../styles/Dashboard.css";

/*
=========================================================
SIMPLE ICON COMPONENT
=========================================================

We are not using lucide-react or any other package.

These are simple SVG icons, so the project works
without installing anything extra.
*/

function Icon({ type, size = 20 }) {
  const icons = {
    home: (
      <>
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),

    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
      </>
    ),

    quiz: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h2" />
        <path d="M14 12h2" />
        <path d="M8 16h2" />
        <path d="M14 16h2" />
      </>
    ),

    chat: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.5-.8L4 20l1.8-4A7.5 7.5 0 1 1 20 11.5z" />
        <path d="M8 11.5h.01" />
        <path d="M12 11.5h.01" />
        <path d="M16 11.5h.01" />
      </>
    ),

    sparkles: (
      <>
        <path d="M12 2l1.4 4.6L18 8l-4.6 1.4L12 14l-1.4-4.6L6 8l4.6-1.4z" />
        <path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z" />
        <path d="M5 15l.7 2.3L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7z" />
      </>
    ),

    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    trend: (
      <>
        <path d="M4 17l5-5 4 3 7-8" />
        <path d="M15 7h5v5" />
      </>
    ),

    brain: (
      <>
        <path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3 3 3 0 0 0 2 3v2a3 3 0 0 0 3 3" />
        <path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 3 3 3 0 0 1-2 3v2a3 3 0 0 1-3 3" />
        <path d="M9 4v16" />
        <path d="M15 4v16" />
        <path d="M9 9h2" />
        <path d="M13 14h2" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[type]}
    </svg>
  );
}


/*
=========================================================
RECENT LESSONS

For now these are frontend values.

Later:
Database → PHP API → React → Real lessons
=========================================================
*/

const recentLessons = [
  {
    id: 1,
    emoji: "🌱",
    title: "Photosynthesis",
    subject: "Science",
    grade: "Grade 8",
    duration: "45 min",
    date: "Today",
  },
  {
    id: 2,
    emoji: "🔢",
    title: "Fractions & Decimals",
    subject: "Mathematics",
    grade: "Grade 6",
    duration: "40 min",
    date: "Yesterday",
  },
  {
    id: 3,
    emoji: "🪐",
    title: "The Solar System",
    subject: "Science",
    grade: "Grade 7",
    duration: "50 min",
    date: "2 days ago",
  },
];


/*
=========================================================
DASHBOARD
=========================================================
*/

function Dashboard({ setCurrentPage, library }) {
  return (
    <div className="dashboard">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="sidebar">

        {/* Logo */}
        <div className="brand">

          <div className="brand-icon">
            <Icon type="sparkles" size={20} />
          </div>

          <div className="brand-text">
            <h2>EDUAI</h2>
            <span>Teaching Co-Pilot</span>
          </div>

        </div>


        {/* Navigation */}
        <nav className="sidebar-nav">

          <p className="nav-title">MAIN</p>

          <button type="button" className="nav-link active">
            <Icon type="home" size={18} />
            <span>Dashboard</span>
          </button>


          <button
            type="button"
            className="nav-link"
            onClick={() => setCurrentPage("create-lesson")}
          >
            <Icon type="book" size={18} />
            <span>Lesson Planner</span>
          </button>


          <button
            type="button"
            className="nav-link"
            onClick={() => setCurrentPage("quiz")}
          >
            <Icon type="quiz" size={18} />
            <span>Quiz Generator</span>
          </button>


          <button
            type="button"
            className="nav-link"
            onClick={() => setCurrentPage("assistant")}
          >
            <Icon type="chat" size={18} />
            <span>AI Assistant</span>
          </button>


          <p className="nav-title library-title">
            LIBRARY
          </p>


          <button type="button" className="nav-link" onClick={() => setCurrentPage("library")}>
            <Icon type="book" size={18} />
            <span>My Library</span>
          </button>


          <button type="button" className="nav-link" onClick={() => setCurrentPage("library")}>
            <Icon type="sparkles" size={18} />
            <span>Teaching Toolkit</span>
          </button>

        </nav>


        {/* Teacher profile */}
        <div className="sidebar-profile">

          <div className="profile-avatar">
            T
          </div>

          <div className="profile-details">
            <strong>Teacher</strong>
            <span>Educator</span>
          </div>

        </div>

      </aside>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="main-content">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="dashboard-header">

          <div>

            <p className="header-label">
              TEACHER DASHBOARD
            </p>

            <h1>
              Good morning, Teacher 👋
            </h1>

            <p className="header-subtitle">
              Let's make today's teaching a little smarter.
            </p>

          </div>


          <button
            type="button"
            className="create-button"
            onClick={() => setCurrentPage("create-lesson")}
          >
            <Icon type="plus" size={18} />
            Create Lesson
          </button>

        </header>


        {/* =================================================
            AI HERO
        ================================================= */}

        <section className="ai-hero">

          <div className="hero-content">

            <div className="ai-badge">
              <Icon type="sparkles" size={14} />
              AI TEACHING CO-PILOT
            </div>

            <h2>
              Plan your next lesson
              <br />
              <span>in seconds.</span>
            </h2>

            <p>
              Tell EDUAI your subject, topic and class level.
              Get a structured lesson plan, activities and
              assessments designed for your students.
            </p>

            <button
              type="button"
              className="hero-button"
              onClick={() => setCurrentPage("create-lesson")}
            >
              Create with AI
              <Icon type="arrow" size={17} />
            </button>

          </div>


          {/* AI Visual */}
          <div className="hero-visual">

            <div className="ai-circle">

              <Icon type="brain" size={48} />

              <div className="circle-dot dot-one"></div>
              <div className="circle-dot dot-two"></div>
              <div className="circle-dot dot-three"></div>

            </div>


            <div className="floating-card floating-one">
              <Icon type="sparkles" size={14} />
              <span>AI Generated</span>
            </div>


            <div className="floating-card floating-two">
              <Icon type="quiz" size={14} />
              <span>Quiz Ready</span>
            </div>

          </div>

        </section>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon purple">
              <Icon type="book" size={20} />
            </div>

            <div>
              <span>Lessons Created</span>
              <strong>{library.lessons.length}</strong>

              <small className="positive">
                <Icon type="trend" size={12} />
                18% this month
              </small>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              <Icon type="quiz" size={20} />
            </div>

            <div>
              <span>Quizzes Generated</span>
              <strong>{library.quizzes.length}</strong>

              <small className="positive">
                <Icon type="trend" size={12} />
                12% this month
              </small>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              <Icon type="clock" size={20} />
            </div>

            <div>
              <span>Time Saved</span>
              <strong>6.5h</strong>

              <small>
                Estimated this month
              </small>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              <Icon type="book" size={20} />
            </div>

            <div>
              <span>Classes Planned</span>
              <strong>8</strong>

              <small>
                Across 4 subjects
              </small>
            </div>

          </div>

        </section>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="section">

          <div className="section-heading">

            <div>
              <h2>Quick Actions</h2>
              <p>What would you like to do?</p>
            </div>

          </div>


          <div className="quick-actions">

            {/* Create Lesson */}

            <button
              type="button"
              className="action-card"
              onClick={() => setCurrentPage("create-lesson")}
            >

              <div className="action-icon purple">
                <Icon type="sparkles" size={21} />
              </div>

              <div className="action-text">
                <h3>Create Lesson</h3>

                <p>
                  Generate a complete lesson plan with AI.
                </p>
              </div>

              <Icon type="arrow" size={18} />

            </button>


            {/* AI Assistant */}

            <button
              type="button"
              className="action-card"
              onClick={() => setCurrentPage("assistant")}
            >

              <div className="action-icon blue">
                <Icon type="chat" size={21} />
              </div>

              <div className="action-text">
                <h3>AI Assistant</h3>

                <p>
                  Ask AI for teaching ideas and support.
                </p>
              </div>

              <Icon type="arrow" size={18} />

            </button>


            {/* Quiz */}

            <button
              type="button"
              className="action-card"
              onClick={() => setCurrentPage("quiz")}
            >

              <div className="action-icon orange">
                <Icon type="quiz" size={21} />
              </div>

              <div className="action-text">
                <h3>Create Quiz</h3>

                <p>
                  Generate questions from your lesson.
                </p>
              </div>

              <Icon type="arrow" size={18} />

            </button>

          </div>

        </section>


        {/* =================================================
            RECENT LESSONS
        ================================================= */}

        <section className="section">

          <div className="section-heading">

            <div>
              <h2>Recent Lessons</h2>

              <p>
                Your latest lesson plans.
              </p>
            </div>

            <button className="view-all">
              View all
              <Icon type="arrow" size={15} />
            </button>

          </div>


          <div className="lessons-container">

            {recentLessons.map((lesson) => (

              <div
                className="lesson-row"
                key={lesson.id}
              >

                <div className="lesson-emoji">
                  {lesson.emoji}
                </div>


                <div className="lesson-info">

                  <h3>{lesson.title}</h3>

                  <div className="lesson-meta">

                    <span>
                      {lesson.subject}
                    </span>

                    <span>•</span>

                    <span>
                      {lesson.grade}
                    </span>

                  </div>

                </div>


                <div className="lesson-duration">

                  <Icon type="clock" size={14} />

                  {lesson.duration}

                </div>


                <div className="lesson-date">
                  {lesson.date}
                </div>


                <button
                  className="open-lesson"
                  onClick={() =>
                    setCurrentPage("library")
                  }
                >
                  <Icon type="arrow" size={16} />
                </button>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            TEACHING TIP
        ================================================= */}

        <section className="teaching-tip">

          <div className="tip-icon">
            💡
          </div>

          <div className="tip-content">

            <strong>
              Teaching tip
            </strong>

            <p>
              Ask EDUAI to explain difficult concepts using
              real-world examples your students can relate to.
            </p>

          </div>

          <button
            onClick={() => setCurrentPage("assistant")}
          >
            Try Assistant
            <Icon type="arrow" size={15} />
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;