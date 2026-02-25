import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function EmotionChart({ riskScore }: { riskScore: number }) {
  let moodData: { name: string; value: number; color: string }[];

  if (riskScore < 30) {
    moodData = [
      { name: "Happy", value: 60, color: "#4caf50" },
      { name: "Neutral", value: 25, color: "#8B4789" },
      { name: "Sad", value: 10, color: "#f59e0b" },
      { name: "Stress", value: 5, color: "#c62828" },
    ];
  } else if (riskScore < 60) {
    moodData = [
      { name: "Happy", value: 30, color: "#4caf50" },
      { name: "Neutral", value: 40, color: "#8B4789" },
      { name: "Sad", value: 20, color: "#f59e0b" },
      { name: "Stress", value: 10, color: "#c62828" },
    ];
  } else {
    moodData = [
      { name: "Happy", value: 10, color: "#4caf50" },
      { name: "Neutral", value: 20, color: "#8B4789" },
      { name: "Sad", value: 30, color: "#f59e0b" },
      { name: "Stress", value: 40, color: "#c62828" },
    ];
  }

  const total = moodData.reduce((s, d) => s + d.value, 0);
  const highest = moodData.reduce((a, b) => a.value > b.value ? a : b);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={moodData}
              dataKey="value"
              innerRadius={52}
              outerRadius={76}
              paddingAngle={3}
              cornerRadius={6}
              startAngle={90}
              endAngle={-270}
            >
              {moodData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid rgba(74,25,66,0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* center label */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center", pointerEvents: "none",
        }}>
          <div style={{ fontSize: "0.75rem", color: "rgba(42,10,36,0.5)" }}>Mood</div>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: highest.color }}>
            {highest.name}
          </div>
          <div style={{ fontSize: "0.6875rem", color: "rgba(42,10,36,0.45)" }}>
            {Math.round((highest.value / total) * 100)}%
          </div>
        </div>
      </div>

      <div className="emotion-legend">
        {moodData.map(d => (
          <div className="emotion-leg-item" key={d.name}>
            <span className="emotion-dot" style={{ background: d.color }} />
            {d.name} — {Math.round((d.value / total) * 100)}%
          </div>
        ))}
      </div>
    </div>
  );
}