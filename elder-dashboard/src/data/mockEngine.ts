export type Alert = {
  id: number;
  title: string;
  location: string;
  timestamp: string;
  status: "Pending" | "Escalated" | "Dismissed";
};

export type Vitals = {
  heartRate: number;
  systolic: number;
  oxygen: number;
};

export function generateVitals(prev: Vitals): Vitals {
  return {
    heartRate:
  prev.heartRate > 120
    ? prev.heartRate
    : clamp(prev.heartRate + random(-5, 5), 60, 110),
    systolic: clamp(prev.systolic + random(-4, 4), 100, 180),
    oxygen: clamp(prev.oxygen + random(-1, 1), 88, 100),
  };
}

export function calculateRisk(
  vitals: Vitals,
  alerts: Alert[]
) {
  let score = 0;

  // Heart Rate Risk
  if (vitals.heartRate > 120) score += 25;
  else if (vitals.heartRate > 100) score += 10;

  // Blood Pressure Risk
  if (vitals.systolic > 160) score += 25;
  else if (vitals.systolic > 140) score += 10;

  // Oxygen Risk
  if (vitals.oxygen < 90) score += 30;
  else if (vitals.oxygen < 94) score += 15;

  // Alert Contribution
  alerts.forEach(a => {
    if (a.status === "Pending") score += 5;
    if (a.status === "Escalated") score += 15;
  });

  return Math.min(score, 100);
}
/* ---------- Helpers ---------- */

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}