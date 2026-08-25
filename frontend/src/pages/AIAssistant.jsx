import React, { useState } from "react";
import "../styles/AIAssistant.css";

function AIAssistant() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! 👋 I'm your AI Teaching Assistant. I can help you create lesson plans, generate activities, explain difficult topics, prepare quizzes, and suggest ways to engage your students."
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);


  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const sendMessage = () => {

    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message
    };

    setMessages((previous) => [
      ...previous,
      userMessage
    ]);

    setMessage("");
    setIsTyping(true);


    // -------------------------------------------------
    // TEMPORARY AI RESPONSE
    // -------------------------------------------------
    // Later this section can be replaced with your
    // actual AI API / PHP backend.
    // -------------------------------------------------

    setTimeout(() => {

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: generateDemoResponse(message)
      };

      setMessages((previous) => [
        ...previous,
        aiMessage
      ]);

      setIsTyping(false);

    }, 900);
  };


  // =====================================================
  // DEMO RESPONSE
  // =====================================================

  const generateDemoResponse = (userMessage) => {

    const text = userMessage.toLowerCase();

    if (text.includes("lesson")) {

      return "Absolutely! I can help you design a lesson plan with learning objectives, activities, teaching methods, required materials, and an assessment section. Tell me the subject, grade, and topic.";

    }

    if (text.includes("quiz")) {

      return "I can help you create a quiz. Tell me the subject, topic, grade level, difficulty, and number of questions you'd like.";

    }

    if (text.includes("activity")) {

      return "For an engaging classroom activity, you can use a Think-Pair-Share exercise, a short group challenge, a real-world case study, or a quick interactive quiz.";

    }

    if (text.includes("student")) {

      return "To improve student engagement, try combining short explanations with questions, collaborative activities, visual examples, and quick knowledge checks.";

    }

    return "That's a great teaching question! I can help you with lesson planning, quizzes, classroom activities, explanations, student engagement, and assessment strategies. Tell me more about what you're teaching.";

  };


  // =====================================================
  // SUGGESTED PROMPT
  // =====================================================

  const useSuggestion = (prompt) => {

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
                    {item.text}
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
                className="send-button"
                onClick={sendMessage}
                disabled={!message.trim()}
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
                  useSuggestion(
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
                  useSuggestion(
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
                  useSuggestion(
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
                  useSuggestion(
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
                  useSuggestion(
                    "Explain photosynthesis to Grade 7 students."
                  )
                }
              >
                "Explain a difficult topic simply"
              </button>


              <button
                className="prompt-button"
                onClick={() =>
                  useSuggestion(
                    "Create a fun 15-minute classroom activity."
                  )
                }
              >
                "Give me a 15-minute activity"
              </button>


              <button
                className="prompt-button"
                onClick={() =>
                  useSuggestion(
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