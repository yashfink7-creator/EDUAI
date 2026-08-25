import { useState } from "react";
import "../styles/Library.css";

function Library({ setCurrentPage, library }) {
  const [activeTab, setActiveTab] = useState("lessons");
  const [selectedItem, setSelectedItem] = useState(null);
  const items = library[activeTab];

  if (selectedItem) {
    const isLesson = selectedItem.kind === "lesson";
    const content = isLesson ? selectedItem.item.plan : selectedItem.item.questions;

    return (
      <main className="library-page">
        <button className="library-back" onClick={() => setSelectedItem(null)}>Back to {isLesson ? "My Lessons" : "My Quizzes"}</button>
        <section className="resource-detail">
          <div className="resource-detail-heading">
            <div>
              <span>{isLesson ? "SAVED LESSON PLAN" : "SAVED QUIZ"}</span>
              <h1>{selectedItem.item.title || selectedItem.item.topic}</h1>
              <p>{selectedItem.item.subject} · {selectedItem.item.grade}</p>
            </div>
            <button onClick={() => setSelectedItem(null)}>Close</button>
          </div>

          {isLesson ? (
            <div className="saved-lesson-content">
              <section><h2>Introduction</h2><p>{content?.introduction}</p></section>
              <section><h2>Learning objectives</h2><ul>{content?.objectives?.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><h2>Teaching activities</h2>{content?.activities?.map((activity) => <article key={activity.title}><strong>{activity.title}</strong><small>{activity.minutes} min</small><p>{activity.description}</p></article>)}</section>
              {content?.visualAids?.length > 0 && <section><h2>Visual toolkit</h2><div className="saved-visual-grid">{content.visualAids.map((aid) => <article key={aid.title}><span>{aid.type}</span><h3>{aid.title}</h3><p>{aid.description}</p></article>)}</div></section>}
              <section><h2>Homework</h2><p>{content?.homework}</p></section>
            </div>
          ) : (
            <div className="saved-quiz-content">{content?.map((question, index) => <article key={`${question.question}-${index}`}><strong>Q{index + 1}</strong><h2>{question.question}</h2><ol type="A">{question.options?.map((option) => <li key={option}>{option}</li>)}</ol><p>Correct answer: {question.options?.[question.answer]}</p></article>)}</div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="library-page">
      <header className="library-header">
        <button className="library-back" onClick={() => setCurrentPage("dashboard")}>Back to Dashboard</button>
        <div>
          <span>YOUR LIBRARY</span>
          <h1>Saved teaching resources</h1>
          <p>Your lesson plans and quizzes stay here for your next class.</p>
        </div>
      </header>

      <div className="library-tabs" role="tablist">
        <button className={activeTab === "lessons" ? "active" : ""} onClick={() => setActiveTab("lessons")} role="tab">My Lessons ({library.lessons.length})</button>
        <button className={activeTab === "quizzes" ? "active" : ""} onClick={() => setActiveTab("quizzes")} role="tab">My Quizzes ({library.quizzes.length})</button>
      </div>

      {items.length === 0 ? (
        <section className="library-empty">
          <h2>No saved {activeTab} yet</h2>
          <p>Generate a resource and choose Save to keep it here.</p>
          <button onClick={() => setCurrentPage(activeTab === "lessons" ? "create-lesson" : "quiz")}>
            Create {activeTab === "lessons" ? "a lesson" : "a quiz"}
          </button>
        </section>
      ) : (
        <section className="library-list">
          {items.map((item) => (
            <button className="library-item" key={item.id} onClick={() => setSelectedItem({ item, kind: activeTab === "lessons" ? "lesson" : "quiz" })}>
              <div className="library-item-icon">{activeTab === "lessons" ? "L" : "Q"}</div>
              <div>
                <h2>{item.title || item.topic}</h2>
                <p>{item.subject} · {item.grade} · {activeTab === "lessons" ? `${item.duration} min` : `${item.questions.length} questions`}</p>
              </div>
              <time>{new Date(item.savedAt).toLocaleDateString()}</time>
              <span className="library-item-action">Open</span>
            </button>
          ))}
        </section>
      )}
    </main>
  );
}

export default Library;
