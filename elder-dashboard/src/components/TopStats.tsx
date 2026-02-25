import type { Alert } from "../data/mockEngine";

type Props = {
  alerts: Alert[];
  riskScore: number;
};

const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A1942" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const PillIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3" />
    <circle cx="18" cy="18" r="3" />
    <path d="M18 15v6M15 18h6" />
  </svg>
);

const MicIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const AlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function TopStats({ alerts, riskScore }: Props) {
  const pending = alerts.filter(a => a.status === "Pending").length;
  const escalated = alerts.filter(a => a.status === "Escalated").length;

  const stats = [
    { icon: <HeartIcon />, label: "Health Score", value: `${riskScore}%`, color: "purple" },
    { icon: <PillIcon />, label: "Medications Today", value: "5 / 6", color: "green" },
    { icon: <MicIcon />, label: "Voice Check-ins", value: "3 Done", color: "orange" },
    { icon: <AlertIcon />, label: "Active Alerts", value: String(pending + escalated), color: "red" },
  ];

  return (
    <div className="stats-grid section-gap">
      {stats.map(s => (
        <div className="stat-card" key={s.label}>
          <div className={`stat-icon ${s.color}`}>{s.icon}</div>
          <div className="stat-body">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}