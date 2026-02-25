import { useState } from "react";

type Props = {
  onSave: (patient: {
    name: string;
    age: number;
    condition: string;
    caregiver: string;
  }) => void;
};

const conditionOptions = [
  "Hypertension",
  "Diabetes",
  "Cardiac Risk",
  "Respiratory Issue",
  "Normal",
];

export default function PatientForm({ onSave }: Props) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    condition: "",
    caregiver: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age) {
      alert("Please enter Name and Age");
      return;
    }
    onSave({
      name: form.name,
      age: Number(form.age),
      condition: form.condition || "Normal",
      caregiver: form.caregiver,
    });
  };

  return (
    <div className="form-page">
      <div className="form-card">

        {/* Logo */}
        <div className="form-logo">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 16C12 13.79 13.79 12 16 12C18.21 12 20 13.79 20 16C20 18.21 18.21 20 16 20"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </svg>
          ElderVoice Guardian
        </div>

        <div className="form-heading">Patient Setup</div>
        <div className="form-subtext">
          Enter the patient's details to begin real-time health monitoring.
        </div>

        <form onSubmit={handleSubmit}>

          <label className="form-label">Full Name *</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Margaret Johnson"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />

          <label className="form-label">Age *</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. 72"
            value={form.age}
            onChange={e => {
              if (/^\d*$/.test(e.target.value))
                setForm({ ...form, age: e.target.value });
            }}
            required
          />

          <label className="form-label">Condition</label>
          <select
            className="form-select"
            value={form.condition}
            onChange={e => setForm({ ...form, condition: e.target.value })}
          >
            <option value="">Select a condition…</option>
            {conditionOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label className="form-label">Caregiver Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Dr. Sarah Lee"
            value={form.caregiver}
            onChange={e => setForm({ ...form, caregiver: e.target.value })}
          />

          <button type="submit" className="form-submit">
            Start Monitoring →
          </button>
        </form>
      </div>
    </div>
  );
}