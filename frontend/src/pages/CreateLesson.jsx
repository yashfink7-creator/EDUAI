import React, { useState } from "react";
import "../styles/CreateLesson.css";

function Icon({ type, size = 20 }) {
  const icons = {
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </>
    ),

    sparkles: (
      <>
        <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
        <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z" />
        <path d="M5 15l.6 1.9L7.5 18l-1.9.6L5 20.5l-.6-1.9L2.5 18l1.9-.6z" />
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

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),

    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-1a6 6 0 0 1 12 0v1" />
        <path d="M16 5a3 3 0 0 1 0 6" />
        <path d="M18 14a5 5 0 0 1 3 4v3" />
      </>
    ),

    wand: (
      <>
        <path d="M15 4l5 5" />
        <path d="M3 21l12-12" />
        <path d="M14 5l5 5" />
        <path d="M18 2v3" />
        <path d="M16.5 3.5h3" />
        <path d="M21 12v2" />
        <path d="M20 13h2" />
      </>
    ),

    check: (
      <>
        <path d="M20 6L9 17l-5-5" />
      </>
    ),

    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),

    lightbulb: (
      <>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8.5 14.5A6 6 0 1 1 15.5 14c-.8.7-1.5 1.5-1.5 2.5h-4c0-1-.7-1.8-1.5-2.5z" />
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


function CreateLesson({ setCurrentPage }) {

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    grade: "",
    duration: "45",
    difficulty: "Medium",
    objectives: "",
    teachingStyle: "Interactive",
    activities: "2",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const [generated, setGenerated] = useState(false);


  /*
  =========================================================
  HANDLE INPUT CHANGES
  =========================================================
  */

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  /*
  =========================================================
  GENERATE LESSON
  =========================================================

  IMPORTANT:

  This currently creates a working frontend experience.

  Later we will replace this with:

  React
      ↓
  PHP API
      ↓
  AI API
      ↓
  Generated lesson
  */

  const handleGenerate = (event) => {

    event.preventDefault();

    if (!formData.subject || !formData.topic || !formData.grade) {
      alert("Please enter Subject, Topic and Grade.");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {

      setIsGenerating(false);

      setGenerated(true);

    }, 1200);

  };


  /*
  =========================================================
  RESET FORM
  =========================================================
  */

  const handleReset = () => {

    setFormData({
      subject: "",
      topic: "",
      grade: "",
      duration: "45",
      difficulty: "Medium",
      objectives: "",
      teachingStyle: "Interactive",
      activities: "2",
    });

    setGenerated(false);

  };


  return (

    <div className="create-lesson-page">


      {/* =================================================
          TOP HEADER
      ================================================= */}

      <header className="create-header">

        <button
          className="back-button"
          onClick={() => setCurrentPage("dashboard")}
        >
          <Icon type="arrowLeft" size={18} />
          Back to Dashboard
        </button>


        <div className="create-header-title">

          <div className="header-ai-icon">
            <Icon type="sparkles" size={18} />
          </div>

          <div>
            <h1>AI Lesson Planner</h1>

            <p>
              Create a personalized lesson plan with AI
            </p>
          </div>

        </div>


        <div className="ai-status">

          <span className="status-dot"></span>

          AI Ready

        </div>

      </header>



      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <main className="create-content">


        {/* =================================================
            INTRO
        ================================================= */}

        <section className="create-intro">

          <div>

            <p className="page-label">
              LESSON CREATOR
            </p>

            <h2>
              What are you teaching today?
            </h2>

            <p className="intro-text">
              Give EDUAI a few details about your class.
              We'll help you structure an engaging lesson
              around your teaching goals.
            </p>

          </div>


          <div className="intro-ai">

            <Icon type="sparkles" size={25} />

            <span>
              AI-powered
            </span>

          </div>

        </section>



        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="lesson-builder-grid">


          {/* =================================================
              FORM
          ================================================= */}

          <section className="lesson-form-card">

            <div className="card-title">

              <div className="card-title-icon">
                <Icon type="book" size={18} />
              </div>

              <div>

                <h3>Lesson Details</h3>

                <p>
                  Tell us about the lesson you want to create.
                </p>

              </div>

            </div>


            <form onSubmit={handleGenerate}>


              {/* Subject + Grade */}

              <div className="form-row">


                <div className="form-group">

                  <label>
                    Subject
                    <span>*</span>
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select subject
                    </option>

                    <option value="Mathematics">
                      Mathematics
                    </option>

                    <option value="Science">
                      Science
                    </option>

                    <option value="English">
                      English
                    </option>

                    <option value="History">
                      History
                    </option>

                    <option value="Geography">
                      Geography
                    </option>

                    <option value="Computer Science">
                      Computer Science
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>



                <div className="form-group">

                  <label>
                    Grade / Class
                    <span>*</span>
                  </label>

                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select grade
                    </option>

                    <option value="Grade 5">
                      Grade 5
                    </option>

                    <option value="Grade 6">
                      Grade 6
                    </option>

                    <option value="Grade 7">
                      Grade 7
                    </option>

                    <option value="Grade 8">
                      Grade 8
                    </option>

                    <option value="Grade 9">
                      Grade 9
                    </option>

                    <option value="Grade 10">
                      Grade 10
                    </option>

                    <option value="Grade 11">
                      Grade 11
                    </option>

                    <option value="Grade 12">
                      Grade 12
                    </option>

                  </select>

                </div>

              </div>



              {/* Topic */}

              <div className="form-group">

                <label>
                  Lesson Topic
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g. Photosynthesis"
                />

                <small>
                  Enter the main concept or topic you want
                  students to learn.
                </small>

              </div>



              {/* Duration + Difficulty */}

              <div className="form-row">


                <div className="form-group">

                  <label>
                    <Icon type="clock" size={14} />
                    Duration
                  </label>

                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  >

                    <option value="30">
                      30 minutes
                    </option>

                    <option value="45">
                      45 minutes
                    </option>

                    <option value="60">
                      60 minutes
                    </option>

                    <option value="90">
                      90 minutes
                    </option>

                    <option value="120">
                      120 minutes
                    </option>

                  </select>

                </div>



                <div className="form-group">

                  <label>
                    Difficulty
                  </label>

                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >

                    <option value="Easy">
                      Easy
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="Advanced">
                      Advanced
                    </option>

                  </select>

                </div>

              </div>



              {/* Objectives */}

              <div className="form-group">

                <label>
                  Learning Objectives
                </label>

                <textarea
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  placeholder="What should students understand or be able to do by the end of this lesson?"
                  rows="4"
                />

                <small>
                  You can leave this empty and let AI suggest
                  suitable objectives.
                </small>

              </div>



              {/* Teaching style */}

              <div className="form-group">

                <label>
                  Teaching Style
                </label>

                <div className="style-options">


                  <button
                    type="button"
                    className={
                      formData.teachingStyle === "Interactive"
                        ? "style-option selected"
                        : "style-option"
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        teachingStyle: "Interactive",
                      })
                    }
                  >

                    <span>🎯</span>

                    <div>
                      <strong>Interactive</strong>
                      <small>Activities & discussion</small>
                    </div>

                  </button>



                  <button
                    type="button"
                    className={
                      formData.teachingStyle === "Visual"
                        ? "style-option selected"
                        : "style-option"
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        teachingStyle: "Visual",
                      })
                    }
                  >

                    <span>🎨</span>

                    <div>
                      <strong>Visual</strong>
                      <small>Examples & visuals</small>
                    </div>

                  </button>



                  <button
                    type="button"
                    className={
                      formData.teachingStyle === "Discussion"
                        ? "style-option selected"
                        : "style-option"
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        teachingStyle: "Discussion",
                      })
                    }
                  >

                    <span>💬</span>

                    <div>
                      <strong>Discussion</strong>
                      <small>Questions & debate</small>
                    </div>

                  </button>

                </div>

              </div>



              {/* Activities */}

              <div className="form-group">

                <label>
                  Number of Activities
                </label>

                <select
                  name="activities"
                  value={formData.activities}
                  onChange={handleChange}
                >

                  <option value="1">
                    1 activity
                  </option>

                  <option value="2">
                    2 activities
                  </option>

                  <option value="3">
                    3 activities
                  </option>

                  <option value="4">
                    4 activities
                  </option>

                </select>

              </div>



              {/* Form actions */}

              <div className="form-actions">

                <button
                  type="button"
                  className="reset-button"
                  onClick={handleReset}
                >
                  Reset
                </button>


                <button
                  type="submit"
                  className="generate-button"
                  disabled={isGenerating}
                >

                  {isGenerating ? (

                    <>
                      <span className="loading-spinner"></span>

                      Generating...

                    </>

                  ) : (

                    <>
                      <Icon type="sparkles" size={17} />

                      Generate Lesson Plan

                    </>

                  )}

                </button>

              </div>

            </form>

          </section>



          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <aside className="lesson-side">


            {/* AI Preview */}

            <div className="ai-preview-card">

              <div className="preview-header">

                <div className="preview-icon">
                  <Icon type="sparkles" size={17} />
                </div>

                <div>

                  <h3>
                    AI will create
                  </h3>

                  <p>
                    Your lesson plan includes
                  </p>

                </div>

              </div>


              <div className="preview-list">

                <div>
                  <Icon type="check" size={15} />
                  <span>Learning objectives</span>
                </div>

                <div>
                  <Icon type="check" size={15} />
                  <span>Lesson introduction</span>
                </div>

                <div>
                  <Icon type="check" size={15} />
                  <span>Teaching activities</span>
                </div>

                <div>
                  <Icon type="check" size={15} />
                  <span>Discussion questions</span>
                </div>

                <div>
                  <Icon type="check" size={15} />
                  <span>Assessment questions</span>
                </div>

                <div>
                  <Icon type="check" size={15} />
                  <span>Homework suggestions</span>
                </div>

              </div>

            </div>



            {/* Generated Preview */}

            {generated && (

              <div className="generated-card">

                <div className="generated-title">

                  <div className="success-icon">
                    <Icon type="check" size={16} />
                  </div>

                  <div>

                    <h3>
                      Lesson Ready
                    </h3>

                    <p>
                      AI has created your lesson structure.
                    </p>

                  </div>

                </div>


                <div className="generated-details">

                  <div>
                    <span>Subject</span>
                    <strong>{formData.subject}</strong>
                  </div>

                  <div>
                    <span>Topic</span>
                    <strong>{formData.topic}</strong>
                  </div>

                  <div>
                    <span>Grade</span>
                    <strong>{formData.grade}</strong>
                  </div>

                  <div>
                    <span>Duration</span>
                    <strong>{formData.duration} min</strong>
                  </div>

                </div>


                <button
                  className="view-result-button"
                  onClick={() =>
                    setCurrentPage("lesson-result")
                  }
                >
                  View Lesson Plan
                </button>

              </div>

            )}



            {/* Teaching Tip */}

            <div className="tip-card">

              <div className="tip-card-icon">
                <Icon type="lightbulb" size={18} />
              </div>

              <div>

                <strong>
                  Pro tip
                </strong>

                <p>
                  Be specific about what your students
                  should achieve. EDUAI can create better
                  activities when your objectives are clear.
                </p>

              </div>

            </div>


          </aside>

        </div>

      </main>

    </div>
  );
}

export default CreateLesson;