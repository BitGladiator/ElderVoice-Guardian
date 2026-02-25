import { useEffect, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Bar,
} from "recharts";

type Vitals = {
  heartRate: number;
  systolic: number;
  oxygen: number;
};

function alertClass(value: number, low: number, high: number) {
  return value < low || value > high ? "alert-red" : "";
}

const HeartRateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const BPIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const OxygenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

export default function HealthMonitor({ vitals }: { vitals: Vitals }) {
  const [history, setHistory] = useState<Record<string, number | string>[]>([]);

  useEffect(() => {
    setHistory(prev => {
      const updated = [
        ...prev,
        {
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          "Heart Rate": vitals.heartRate,
          "Blood Pressure": vitals.systolic,
          "Oxygen": vitals.oxygen,
        },
      ];
      return updated.slice(-10);
    });
  }, [vitals]);

  return (
    <div>
      {/* Live chips */}
      <div className="vitals-row">
        <div className={`vital-chip ${alertClass(vitals.heartRate, 60, 100)}`}>
          <span className="vital-chip-icon"><HeartRateIcon /></span>
          <span className="vital-chip-val">{vitals.heartRate}</span>
          <span className="vital-chip-lbl">bpm</span>
        </div>
        <div className={`vital-chip ${alertClass(vitals.systolic, 90, 140)}`}>
          <span className="vital-chip-icon"><BPIcon /></span>
          <span className="vital-chip-val">{vitals.systolic}</span>
          <span className="vital-chip-lbl">mmHg</span>
        </div>
        <div className={`vital-chip ${alertClass(vitals.oxygen, 94, 100)}`}>
          <span className="vital-chip-icon"><OxygenIcon /></span>
          <span className="vital-chip-val">{vitals.oxygen}%</span>
          <span className="vital-chip-lbl">SpO₂</span>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={180}>
          <ComposedChart data={history} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,25,66,0.07)" />
            <XAxis dataKey="time" stroke="rgba(42,10,36,0.4)" tick={{ fontSize: 10 }} />
            <YAxis stroke="rgba(42,10,36,0.4)" tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid rgba(74,25,66,0.1)",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Oxygen" fill="rgba(139,71,137,0.25)" radius={[4, 4, 0, 0]} yAxisId={0} />
            <Line type="monotone" dataKey="Heart Rate" stroke="#c62828" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Blood Pressure" stroke="#4A1942" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}