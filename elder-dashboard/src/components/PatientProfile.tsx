type Props = {
  name: string;
  age: number;
  condition: string;
  caregiver: string;
};

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function PatientProfile({ name, age, condition, caregiver }: Props) {
  return (
    <div>
      <div className="profile-header">
        <div className="profile-avatar">{name.charAt(0).toUpperCase()}</div>
        <div>
          <div className="profile-name">{name}</div>
          <div className="profile-age">Age {age}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div className="profile-row">
          <div className="profile-lbl">Condition</div>
          <span className="condition-chip">{condition || "Normal"}</span>
        </div>
        <div className="profile-row">
          <div className="profile-lbl">Caregiver</div>
          <div className="profile-val">{caregiver || "—"}</div>
        </div>
        <div className="profile-row">
          <div className="profile-lbl">Monitoring Since</div>
          <div className="profile-val">
            {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-lbl">Status</div>
          <div className="profile-val" style={{ color: "#2e7d32", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <CheckIcon /> Active
          </div>
        </div>
      </div>
    </div>
  );
}