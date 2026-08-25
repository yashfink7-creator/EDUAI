import { useState } from "react";
import "../styles/Login.css";
import { isSupabaseConfigured, supabase } from "../services/supabase";

function Login() {
	const [mode, setMode] = useState("login");
	const [form, setForm] = useState({ email: "", password: "", name: "" });
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setMessage("");

		if (!isSupabaseConfigured || !supabase) {
			setError("Add your Supabase URL and publishable key to frontend/.env.local first.");
			return;
		}

		setLoading(true);
		const result = mode === "login"
			? await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
			: await supabase.auth.signUp({
				email: form.email,
				password: form.password,
				options: { data: { display_name: form.name } },
			});

		if (result.error) {
			setError(result.error.message);
		} else if (mode === "signup" && !result.data.session) {
			setMessage("Account created. Check your email to confirm your account, then sign in.");
			setMode("login");
		}

		setLoading(false);
	};

	return (
		<main className="login-page">
			<section className="login-showcase">
				<div className="login-mark">✦</div>
				<span>EDUAI / TEACHING CO-PILOT</span>
				<h1>Make every lesson feel more prepared.</h1>
				<p>Plan clearly, create engaging assessments, and keep your best teaching work close at hand.</p>
				<div className="login-proof">
					<span>AI lesson plans</span>
					<span>Smart quizzes</span>
					<span>Saved library</span>
				</div>
			</section>

			<section className="login-panel">
				<div className="login-panel-heading">
					<span>WELCOME BACK</span>
					<h2>{mode === "login" ? "Sign in to EDUAI" : "Create your teacher account"}</h2>
					<p>{mode === "login" ? "Pick up where your next class begins." : "Your teaching workspace is a few details away."}</p>
				</div>

				<div className="login-switcher" role="tablist">
					<button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Sign in</button>
					<button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Create account</button>
				</div>

				<form className="login-form" onSubmit={handleSubmit}>
					{mode === "signup" && <label>Display name<input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Alex Morgan" required /></label>}
					<label>Email address<input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@school.edu" autoComplete="email" required /></label>
					<label>Password<input name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength="6" required /></label>
					{error && <p className="login-message error" role="alert">{error}</p>}
					{message && <p className="login-message success" role="status">{message}</p>}
					<button className="login-submit" type="submit" disabled={loading}>{loading ? "Working..." : mode === "login" ? "Sign in" : "Create account"}<span>→</span></button>
				</form>
				<p className="login-note">Your account keeps your lesson plans and quizzes private.</p>
			</section>
		</main>
	);
}

export default Login;
