import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

export default function AIAssistant() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        if (!message.trim()) return;

        setLoading(true);
        setError("");
        setResponse("");

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5500";
            const res = await axios.post(`${backendUrl}/api/ai/analyze`, {
                message
            });
            setResponse(res.data.analysis);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to analyze message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-title">
                <span className="card-title-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 7 4 4 20 4 20 7" />
                        <line x1="9" y1="20" x2="15" y2="20" />
                        <line x1="12" y1="4" x2="12" y2="20" />
                    </svg>
                </span>
                AI Health Assistant
            </div>

            <div className="ai-assistant-container" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <textarea
                    className="form-input"
                    placeholder="Describe symptoms or ask a health question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    style={{ resize: "vertical", marginBottom: 0 }}
                />

                <button
                    className="btn btn-primary"
                    onClick={handleAnalyze}
                    disabled={loading || !message.trim()}
                    style={{ alignSelf: "flex-end" }}
                >
                    {loading ? "Analyzing..." : "Analyze Options"}
                </button>

                {error && (
                    <div className="alert-item pending" style={{ padding: "0.75rem", fontSize: "0.875rem", color: "var(--danger)" }}>
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {response && (
                    <div style={{
                        background: "var(--light)",
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid rgba(74,25,66,0.08)",
                        fontSize: "0.9rem",
                        color: "var(--dark)",
                        lineHeight: "1.6",
                        whiteSpace: "pre-wrap"
                    }}>
                        <strong>AI Response:</strong>
                        <div style={{ marginTop: "0.5rem" }} className="markdown-body">
                            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                                {response}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
