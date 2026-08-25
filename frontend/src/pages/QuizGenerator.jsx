import { useState } from "react";
import "../styles/QuizGenerator.css";
import { generateQuiz as requestQuiz } from "../services/api";
import { saveQuiz } from "../services/storage";

function QuizGenerator({ setCurrentPage, onSave }) {

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState("5");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Generate quiz
  const generateQuiz = () => {

    if (!subject || !topic || !grade) {
      alert("Please fill Subject, Topic and Grade.");
      return;
    }

    setLoading(true);
    setError("");
    setIsSaved(false);

    requestQuiz({ subject, topic, grade, difficulty, questionCount: Number(questionCount) })
      .then(({ questions: generatedQuestions }) => setQuestions(generatedQuestions))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  };

  const handleSaveQuiz = () => {
    if (!questions.length || isSaved) return;

    const savedQuiz = saveQuiz({
      title: topic,
      subject,
      topic,
      grade,
      difficulty,
      questions,
      savedAt: new Date().toISOString(),
    });

    onSave("quizzes", savedQuiz);
    setIsSaved(true);
  };


  // Change correct answer
  const changeAnswer = (questionIndex, optionIndex) => {

    const updatedQuestions = [...questions];

    updatedQuestions[questionIndex].answer = optionIndex;

    setQuestions(updatedQuestions);
  };


  // Delete question
  const deleteQuestion = (index) => {

    const updatedQuestions = questions.filter(
      (_, questionIndex) => questionIndex !== index
    );

    setQuestions(updatedQuestions);
  };


  // Add question
  const addQuestion = () => {

    setQuestions([
      ...questions,
      {
        question: "Enter your question here...",
        options: [
          "Option A",
          "Option B",
          "Option C",
          "Option D"
        ],
        answer: 0
      }
    ]);
  };


  return (

    <div className="quiz-page">

      {/* HEADER */}

      <header className="quiz-header">

        <button
          className="back-button"
          onClick={() => setCurrentPage("dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="quiz-title">

          <div className="quiz-title-icon">
            ✨
          </div>

          <div>
            <h1>AI Quiz Generator</h1>
            <p>Create assessments for your students</p>
          </div>

        </div>

        <div className="ai-status">
          <span></span>
          AI Ready
        </div>

      </header>


      {/* MAIN */}

      <main className="quiz-container">


        {/* INTRO */}

        <section className="quiz-intro">

          <div>

            <span className="small-heading">
              ASSESSMENT BUILDER
            </span>

            <h2>
              Turn your lesson into a quiz.
            </h2>

            <p>
              Enter your lesson details and generate
              questions automatically.
            </p>

          </div>

          <div className="intro-icon">
            📝
          </div>

        </section>


        {/* SETTINGS */}

        <section className="settings-card">

          <div className="section-title">

            <div className="section-icon">
              ⚙
            </div>

            <div>
              <h3>Quiz Settings</h3>
              <p>Customize your assessment.</p>
            </div>

          </div>


          <div className="form-grid">


            {/* SUBJECT */}

            <div className="form-group">

              <label>
                Subject <span>*</span>
              </label>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
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

              </select>

            </div>


            {/* TOPIC */}

            <div className="form-group">

              <label>
                Topic <span>*</span>
              </label>

              <input
                type="text"
                placeholder="e.g. Photosynthesis"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />

            </div>


            {/* GRADE */}

            <div className="form-group">

              <label>
                Grade <span>*</span>
              </label>

              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >

                <option value="">
                  Select grade
                </option>

                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>

              </select>

            </div>


            {/* NUMBER */}

            <div className="form-group">

              <label>
                Number of Questions
              </label>

              <select
                value={questionCount}
                onChange={(e) =>
                  setQuestionCount(e.target.value)
                }
              >

                <option value="3">3 Questions</option>
                <option value="5">5 Questions</option>

              </select>

            </div>


            {/* DIFFICULTY */}

            <div className="form-group">

              <label>
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
              >

                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>

              </select>

            </div>


            {/* QUESTION TYPE */}

            <div className="form-group">

              <label>
                Question Type
              </label>

              <select>

                <option>
                  Multiple Choice
                </option>

                <option>
                  True / False
                </option>

                <option>
                  Mixed
                </option>

              </select>

            </div>

          </div>


          <button
            className="generate-button"
            onClick={generateQuiz}
            disabled={loading}
          >

            {loading
              ? "Generating..."
              : "✨ Generate Quiz"
            }

          </button>

          {error && <p className="form-error" role="alert">{error}</p>}

        </section>


        {/* GENERATED QUIZ */}

        {questions.length > 0 && (

          <section className="generated-section">

            <div className="generated-header">

              <div>

                <span className="small-heading">
                  GENERATED QUIZ
                </span>

                <h2>
                  {topic}
                </h2>

                <p>
                  {subject} • {grade} •{" "}
                  {difficulty} •{" "}
                  {questions.length} Questions
                </p>

              </div>

              <button
                className="save-button"
                onClick={handleSaveQuiz}
                disabled={isSaved}
              >
                {isSaved ? "Saved to My Quizzes" : "Save Quiz"}
              </button>

            </div>


            {/* QUESTIONS */}

            {questions.map((question, index) => (

              <div
                className="question-card"
                key={index}
              >

                <div className="question-top">

                  <div className="question-number">
                    Q{index + 1}
                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteQuestion(index)
                    }
                  >
                    Delete
                  </button>

                </div>


                <textarea
                  className="question-input"
                  value={question.question}
                  onChange={(e) => {

                    const updated = [...questions];

                    updated[index].question =
                      e.target.value;

                    setQuestions(updated);

                  }}
                />


                <div className="options">

                  {question.options.map(
                    (option, optionIndex) => (

                      <div
                        className={
                          question.answer === optionIndex
                            ? "option correct"
                            : "option"
                        }
                        key={optionIndex}
                      >

                        <button
                          className="answer-button"
                          onClick={() =>
                            changeAnswer(
                              index,
                              optionIndex
                            )
                          }
                        >

                          {question.answer === optionIndex
                            ? "✓"
                            : String.fromCharCode(
                                65 + optionIndex
                              )
                          }

                        </button>


                        <input
                          value={option}
                          onChange={(e) => {

                            const updated =
                              [...questions];

                            updated[index].options[
                              optionIndex
                            ] = e.target.value;

                            setQuestions(updated);

                          }}
                        />


                        {question.answer ===
                          optionIndex && (

                          <span className="correct-text">
                            Correct
                          </span>

                        )}

                      </div>

                    )
                  )}

                </div>

              </div>

            ))}


            <button
              className="add-question"
              onClick={addQuestion}
            >
              + Add Question
            </button>

          </section>

        )}


        {/* EMPTY STATE */}

        {questions.length === 0 && !loading && (

          <div className="empty-state">

            <div className="empty-icon">
              ✨
            </div>

            <h3>
              Your quiz will appear here
            </h3>

            <p>
              Enter the quiz details above and
              click Generate Quiz.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default QuizGenerator;