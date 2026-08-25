import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "../styles/AIAssistant.css";
import { askAssistant } from "../services/api";

function AIAssistant({ setCurrentPage }) {

  const messageId = useRef(2);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! 👋 I'm your AI Teaching Assistant. I can help you create lesson plans, generate activities, explain difficult topics, prepare quizzes, and suggest ways to engage your students."
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");


  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = async () => {

    if (!message.trim()) return;

    const submittedMessage = message.trim();
    const history = messages.slice(-8).map((item) => ({
      role: item.sender === "user" ? "user" : "assistant",
      text: item.text,
    }));

    const userMessage = {
      id: messageId.current++,
      sender: "user",
      text: submittedMessage
    };

    setMessages((previous) => [
      ...previous,
      userMessage
    ]);

    setMessage("");
    setIsTyping(true);
    setError("");

    try {
      const { response } = await askAssistant(submittedMessage, history);
      const aiMessage = {
        id: messageId.current++,
        sender: "ai",
        text: response,
      };

      setMessages((previous) => [
        ...previous,
        aiMessage
      ]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsTyping(false);
    }
  };


  // =====================================================
  // SUGGESTED PROMPT
  // =====================================================

  const handleSuggestion = (prompt) => {

    setMessage(prompt);

  };


  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      sendMessage();

    }

  };


  return (

    <div className="ai-assistant-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="assistant-header">

        <button
          type="button"
          className="assistant-back"
          onClick={() => setCurrentPage("dashboard")}
        >
          ← Dashboard
        </button>

        <div className="assistant-brand">

          <div className="brand-icon">
            ✦
          </div>

          <div>

            <h1>AI Teacher Assistant</h1>

            <p>
              Your intelligent classroom companion
            </p>

          </div>

        </div>


        <div className="ai-online">

          <span className="online-dot"></span>

          AI Assistant Online

        </div>

      </header>



      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="assistant-container">


        {/* =================================================
            HERO
        ================================================= */}

        <section className="assistant-hero">

          <div className="hero-content">

            <div className="hero-label">
              AI-POWERED TEACHING
            </div>

            <h2>
              Teach smarter.
              <br />
              <span>Inspire more.</span>
            </h2>

            <p>
              Get instant help with lesson planning,
              classroom activities, quizzes, explanations
              and student engagement.
            </p>

          </div>


          <div className="hero-visual">

            <div className="orb orb-one"></div>

            <div className="orb orb-two"></div>

            <div className="brain-icon">
              🧠
            </div>

            <div className="floating-card card-one">
              📚 Lesson Ideas
            </div>

            <div className="floating-card card-two">
              ✨ AI Suggestions
            </div>

            <div className="floating-card card-three">
              📝 Smart Quizzes
            </div>

          </div>

        </section>



        {/* =================================================
            CONTENT GRID
        ================================================= */}

        <div className="assistant-grid">


          {/* =================================================
              CHATBOT
          ================================================= */}

          <section className="chat-section">


            {/* CHAT HEADER */}

            <div className="chat-header">

              <div className="chat-profile">

                <div className="chat-avatar">
                  ✦
                </div>

                <div>

                  <h3>
                    Teaching Assistant
                  </h3>

                  <p>
                    Ask me anything about teaching
                  </p>

                </div>

              </div>


              <div className="chat-status">
                ● Ready
              </div>

            </div>


            {/* CHAT MESSAGES */}

            <div className="chat-messages">

              {messages.map((item) => (

                <div
                  key={item.id}
                  className={
                    item.sender === "user"
                      ? "message-row user-row"
                      : "message-row"
                  }
                >

                  {item.sender === "ai" && (

                    <div className="message-avatar">
                      ✦
                    </div>

                  )}


                  <div
                    className={
                      item.sender === "user"
                        ? "message user-message"
                        : "message ai-message"
                    }
                  >
                    {item.sender === "ai" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {item.text}
                      </ReactMarkdown>
                    ) : item.text}
                  </div>

                </div>

              ))}


              {/* TYPING */}

              {isTyping && (

                <div className="message-row">

                  <div className="message-avatar">
                    ✦
                  </div>

                  <div className="typing-message">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>

              )}

              {error && (
                <p className="assistant-error" role="alert">
                  {error}
                </p>
              )}

            </div>


            {/* CHAT INPUT */}

            <div className="chat-input-area">

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI teaching assistant..."
                rows="1"
              />

              <button
                type="button"
                className="send-button"
                onClick={sendMessage}
                disabled={!message.trim() || isTyping}
              >
                ➤
              </button>

            </div>


            <p className="chat-disclaimer">
              AI-generated suggestions should be reviewed
              by the teacher before classroom use.
            </p>

          </section>



          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="assistant-sidebar">


            {/* QUICK ACTIONS */}

            <div className="sidebar-card">

              <div className="sidebar-title">

                <div>
                  <h3>Quick Actions</h3>
                  <p>Start with a teaching task</p>
                </div>

                <span>⚡</span>

              </div>


              <button
                className="quick-action"
                onClick={() =>
                  handleSuggestion(
                    "Create a lesson plan for my class."
                  )
                }
              >

                <div className="action-icon lesson-icon">
                  📚
                </div>

                <div>
                  <strong>
                    Create Lesson Plan
                  </strong>

                  <small>
                    Build a structured lesson
                  </small>
                </div>

                <b>›</b>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  handleSuggestion(
                    "Create a quiz for my students."
                  )
                }
              >

                <div className="action-icon quiz-icon">
                  📝
                </div>

                <div>
                  <strong>
                    Generate Quiz
                  </strong>

                  <small>
                    Create assessment questions
                  </small>
                </div>

                <b>›</b>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  handleSuggestion(
                    "Give me some engaging classroom activities."
                  )
                }
              >

                <div className="action-icon activity-icon">
                  🎯
                </div>

                <div>
                  <strong>
                    Classroom Activities
                  </strong>

                  <small>
                    Make learning interactive
                  </small>
                </div>

                <b>›</b>

              </button>


              <button
                className="quick-action"
                onClick={() =>
                  handleSuggestion(
                    "Give me ideas to improve student engagement."
                  )
                }
              >

                <div className="action-icon student-icon">
                  👥
                </div>

                <div>
                  <strong>
                    Student Engagement
                  </strong>

                  <small>
                    Improve participation
                  </small>
                </div>

                <b>›</b>

              </button>

            </div>



            {/* SUGGESTED PROMPTS */}

            <div className="sidebar-card">

              <div className="sidebar-title">

                <div>

                  <h3>
                    Suggested Prompts
                  </h3>

                  <p>
                    Try asking the AI
                  </p>

                </div>

                <span>💡</span>

              </div>


              <button
                className="prompt-button"
                onClick={() =>
                  handleSuggestion(
                    "Explain photosynthesis to Grade 7 students."
                  )
                }
              >
                "Explain a difficult topic simply"
              </button>


              <button
                className="prompt-button"
                onClick={() =>
                  handleSuggestion(
                    "Create a fun 15-minute classroom activity."
                  )
                }
              >
                "Give me a 15-minute activity"
              </button>


              <button
                className="prompt-button"
                onClick={() =>
                  handleSuggestion(
                    "How can I assess student understanding?"
                  )
                }
              >
                "How can I assess understanding?"
              </button>

            </div>



            {/* AI CAPABILITIES */}

            <div className="capability-card">

              <div className="capability-icon">
                ✨
              </div>

              <h3>
                What can I ask?
              </h3>

              <p>
                Ask the assistant to adapt lessons,
                simplify explanations, create activities,
                generate questions or suggest assessments.
              </p>

            </div>

          </aside>

        </div>

      </main>

    </div>

  );

}

export default AIAssistant;