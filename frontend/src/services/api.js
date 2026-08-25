const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const request = async (path, body) => {
	const response = await fetch(`${API_URL}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error || "The AI request failed");
	}

	return data;
};

export const generateLesson = (details) => request("/api/generate-lesson", details);

export const generateQuiz = (details) => request("/api/generate-quiz", details);

export const askAssistant = (message, history = []) =>
	request("/api/assistant", { message, history });
