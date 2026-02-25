import type { Alert } from "../data/mockEngine";

type Props = {
  alerts: Alert[];
  riskScore: number;
  vitals: {
    heartRate: number;
    systolic: number;
    oxygen: number;
  };
  patient: {
    name: string;
    age: number;
    condition: string;
    caregiver: string;
  };
  generateAlert: () => void;
  simulateEmergency: () => void;
  updateStatus: (
    id: number,
    status: "Pending" | "Escalated" | "Dismissed"
  ) => void;
  exportReport: () => void;
  clearPatient: () => void;
};

import TopStats from "../components/TopStats";
import HealthMonitor from "../components/HealthMonitor";
import EmotionChart from "../components/EmotionChart";
import PatientProfile from "../components/PatientProfile";
import { useEffect, useRef } from "react";

export default function DashboardPage({
  alerts,
  riskScore,
  patient,
  generateAlert,
  simulateEmergency,
  updateStatus,
  exportReport,
  clearPatient,
  vitals,
}: Props) {
  const alertRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hasPending = alerts.some(a => a.status === "Pending");
    if (riskScore > 70 && hasPending && alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [riskScore, alerts]);

  // Risk ring calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (riskScore / 100) * circumference;
  const ringColor =
    riskScore > 70 ? "#c62828" : riskScore > 40 ? "#e65100" : "#2e7d32";

  const riskStatus =
    riskScore > 70 ? "Critical Condition" : riskScore > 40 ? "Moderate Risk" : "Stable";

  const riskDesc =
    riskScore > 70
      ? "Immediate attention required. Vitals are at a dangerous level."
      : riskScore > 40
        ? "Patient shows moderate risk. Monitor closely over the next hour."
        : "Patient vitals are within acceptable range. Continue monitoring.";

  return (
    <div className="db-shell">

      {/* ── NAV ── */}
      <nav className="db-nav">
        <div className="db-nav-brand">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 16C12 13.79 13.79 12 16 12C18.21 12 20 13.79 20 16C20 18.21 18.21 20 16 20"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </svg>
          ElderVoice Guardian
        </div>

        <div className="db-nav-actions">
          <button className="btn btn-ghost btn-sm" onClick={exportReport}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            Export Report
          </button>
          <button className="btn btn-ghost btn-sm" onClick={generateAlert}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            Alert
          </button>
          <button className="btn btn-ghost btn-sm" onClick={clearPatient}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" /></svg>
            Reset Patient
          </button>
          <button
            className="btn btn-white btn-sm"
            onClick={() => {
              localStorage.removeItem("ev_token");
              localStorage.removeItem("ev_user");
              window.location.href = (import.meta.env.VITE_FRONTEND_URL ?? 'http://localhost:5173') + '/login';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Logout
          </button>
        </div>
      </nav>

      <main className="db-main">

        {/* ── PAGE HEADER ── */}
        <div className="page-header">
          <div>
            <div className="section-label-sm">Health Dashboard</div>
            <div className="page-title">Welcome back, {patient.name}</div>
            <div className="page-subtitle">
              Real-time monitoring • {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <TopStats alerts={alerts} riskScore={riskScore} />

        {/* ── RISK + VITALS ROW ── */}
        <div className="db-grid section-gap">

          {/* Risk Ring */}
          <div className="card">
            <div className="card-title">
              <span className="card-title-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </span>
              Patient Risk Assessment
            </div>
            <div className="risk-card" style={{ padding: "0.25rem 0" }}>
              <div className="risk-ring-wrap">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle className="risk-ring-bg" cx="70" cy="70" r={radius} />
                  <circle
                    className="risk-ring-bar"
                    cx="70" cy="70" r={radius}
                    stroke={ringColor}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transformOrigin: "70px 70px", transform: "rotate(-90deg)" }}
                  />
                </svg>
                <div className="risk-ring-center">
                  <span className="risk-pct" style={{ color: ringColor }}>{riskScore}%</span>
                  <span className="risk-label">risk</span>
                </div>
              </div>
              <div className="risk-info">
                <div className="risk-status" style={{ color: ringColor }}>{riskStatus}</div>
                <div className="risk-desc">{riskDesc}</div>
              </div>
            </div>
          </div>

          {/* Health Monitor Chart */}
          <div className="card">
            <div className="card-title">
              <span className="card-title-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </span>
              Vitals Monitor
            </div>
            <HealthMonitor vitals={vitals} />
          </div>
        </div>

        {/* ── ALERTS + EMOTION ROW ── */}
        <div className="db-grid-3 section-gap" ref={alertRef}>

          {/* Alerts */}
          <div className="card">
            <div className="card-title">
              <span className="card-title-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              </span>
              Live Alerts
            </div>

            <div className="alert-action-row">
              <button className="btn btn-warning btn-sm btn-full" onClick={simulateEmergency}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                Simulate Emergency
              </button>
              <button className="btn btn-danger btn-sm btn-full" onClick={generateAlert}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                Generate Alert
              </button>
            </div>

            {alerts.length === 0 ? (
              <div className="empty-state">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(74,25,66,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.5rem" }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <div>No active alerts — patient is stable.</div>
              </div>
            ) : (
              alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`alert-item ${alert.status.toLowerCase()}`}
                >
                  <div className="alert-title">{alert.title}</div>
                  <div className="alert-meta">
                    {alert.location} • {alert.timestamp}
                    {" "}
                    <span className={`badge badge-${alert.status.toLowerCase()}`}>
                      {alert.status}
                    </span>
                  </div>
                  {alert.status === "Pending" && (
                    <div className="alert-btns">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateStatus(alert.id, "Escalated")}
                      >
                        Escalate
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updateStatus(alert.id, "Dismissed")}
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Emotion Chart */}
          <div className="card">
            <div className="card-title">
              <span className="card-title-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
              </span>
              Voice Emotion Analysis
            </div>
            <EmotionChart riskScore={riskScore} />
          </div>
        </div>

        {/* ── PATIENT PROFILE ── */}
        <div className="card section-gap">
          <div className="card-title">
            <span className="card-title-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </span>
            Patient Profile
          </div>
          <PatientProfile
            name={patient.name}
            age={patient.age}
            condition={patient.condition}
            caregiver={patient.caregiver}
          />
        </div>

      </main>
    </div>
  );
}