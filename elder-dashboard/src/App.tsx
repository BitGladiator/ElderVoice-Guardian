import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import getTheme from "./theme";
import DashboardPage from "./pages/DashboardPage";
import PatientForm from "./pages/PatientForm";
import {
  generateVitals,
  calculateRisk,
} from "./data/mockEngine";
import type { Vitals, Alert } from "./data/mockEngine";
import jsPDF from "jspdf";

type Patient = {
  name: string;
  age: number;
  condition: string;
  caregiver: string;
};

export default function App() {

  /* ===============================
     THEME
  =============================== */

  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("mode") as "light" | "dark") || "light"
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);


  /* ===============================
     PATIENT (Persistent + Onboarding)
  =============================== */

  const [patient, setPatient] = useState<Patient | null>(() => {
    const saved = localStorage.getItem("patient");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (patient) {
      localStorage.setItem("patient", JSON.stringify(patient));
    }
  }, [patient]);

  const clearPatient = () => {
    localStorage.removeItem("patient");
    setPatient(null);
  };


  /* ===============================
     VITALS (Dynamic Engine)
  =============================== */

  const [vitals, setVitals] = useState<Vitals>({
    heartRate: 78,
    systolic: 120,
    oxygen: 98,
  });


  /* =====================================================
   ALERT SYSTEM (FINAL CLEAN STABLE VERSION)
===================================================== */

/* Core States */
const [alerts, setAlerts] = useState<Alert[]>([]);
const [wasAbnormal, setWasAbnormal] = useState(false);
const [isEmergency, setIsEmergency] = useState(false);

/* =====================================================
   VITAL ENGINE CONTROL
   - Stops auto-random updates during emergency
===================================================== */

useEffect(() => {
  if (isEmergency) return;

  const interval = setInterval(() => {
    setVitals(prev => generateVitals(prev));
  }, 4000);

  return () => clearInterval(interval);
}, [isEmergency]);

/* =====================================================
   ABNORMAL DETECTION (Triggers ONCE)
===================================================== */

useEffect(() => {
  const abnormal =
    vitals.heartRate > 120 ||
    vitals.systolic > 160 ||
    vitals.oxygen < 90;

  if (abnormal && !wasAbnormal) {
    setAlerts(prev => [
      {
        id: Date.now(),
        title: "Abnormal Vital Detected",
        location: "Monitoring Engine",
        timestamp: new Date().toLocaleTimeString(),
        status: "Pending",
      },
      ...prev,
    ]);
  }

  setWasAbnormal(abnormal);
}, [vitals, wasAbnormal]);

/* =====================================================
   AUTO ESCALATION (15s delay)
===================================================== */

useEffect(() => {
  const timer = setInterval(() => {
    setAlerts(prev =>
      prev.map(a =>
        a.status === "Pending"
          ? { ...a, status: "Escalated" }
          : a
      )
    );
  }, 15000);

  return () => clearInterval(timer);
}, []);

/* =====================================================
   MANUAL ALERT
===================================================== */

const generateAlert = () => {
  setAlerts(prev => [
    {
      id: Date.now(),
      title: "Manual Alert Triggered",
      location: "Caregiver Panel",
      timestamp: new Date().toLocaleTimeString(),
      status: "Pending",
    },
    ...prev,
  ]);
};

/* =====================================================
   SIMULATE EMERGENCY
===================================================== */

const simulateEmergency = () => {
  setIsEmergency(true);

  setVitals({
    heartRate: 150,
    systolic: 180,
    oxygen: 85,
  });
};

/* =====================================================
   UPDATE ALERT STATUS
===================================================== */

const updateStatus = (
  id: number,
  status: "Pending" | "Escalated" | "Dismissed"
) => {
  setAlerts(prev =>
    prev.map(alert =>
      alert.id === id
        ? { ...alert, status }
        : alert
    )
  );

  if (status === "Dismissed") {
    setIsEmergency(false);
  }
};

  /* ===============================
     RISK
  =============================== */

  const riskScore = calculateRisk(vitals, alerts);


  /* ===============================
     EXPORT FUNCTION
  =============================== */

 const exportReport = () => {
  if (!patient) {
    alert("No patient selected");
    return;
  }

  const doc = new jsPDF();

  const img = new Image();
  img.src = "/logo.png";

  img.onload = () => {
    /* ================= HEADER ================= */

    doc.setFillColor(25, 118, 210);
    doc.rect(0, 0, 210, 25, "F");

    doc.addImage(img, "PNG", 160, 5, 30, 15);
    // WATERMARK (center transparent logo)
doc.setGState(doc.GState({ opacity: 0.08 }));

doc.addImage(
  img,
  "PNG",
  40,   // X position (centered)
  90,   // Y position (centered)
  130,  // Width
  80    // Height
);


doc.setGState(doc.GState({ opacity: 1 }));

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("Elder Voice Guardian", 20, 15);

    doc.setFontSize(10);
    doc.text("AI-Based Health Monitoring Report", 20, 21);

    doc.setTextColor(0, 0, 0);

    /* ================= PATIENT INFO ================= */

    doc.setFontSize(12);
    doc.text("Patient Information", 20, 40);
    doc.rect(20, 45, 170, 30);

    doc.text(`Name: ${patient.name}`, 25, 55);
    doc.text(`Age: ${patient.age}`, 25, 62);
    doc.text(`Condition: ${patient.condition}`, 25, 69);
    doc.text(`Caregiver: ${patient.caregiver}`, 110, 55);

    /* ================= RISK ================= */

    let riskColor: [number, number, number];

    if (riskScore > 70) riskColor = [211, 47, 47];
    else if (riskScore > 40) riskColor = [237, 108, 2];
    else riskColor = [46, 125, 50];

    doc.setFontSize(14);
    doc.text("Risk Assessment", 20, 90);

    doc.setFillColor(...riskColor);
    doc.rect(20, 95, 170 * (riskScore / 100), 8, "F");

    doc.setFontSize(12);
    doc.text(`Risk Score: ${riskScore}%`, 20, 110);

    /* ================= VITALS ================= */

    doc.setFontSize(14);
    doc.text("Latest Vitals", 20, 125);

    doc.rect(20, 130, 170, 25);

    doc.setFontSize(12);
    doc.text(`Heart Rate: ${vitals.heartRate} bpm`, 25, 140);
    doc.text(`Blood Pressure: ${vitals.systolic} mmHg`, 25, 147);
    doc.text(`Oxygen Level: ${vitals.oxygen}%`, 110, 140);

    /* ================= ALERTS ================= */

    doc.setFontSize(14);
    doc.text("Alerts Summary", 20, 170);

    if (alerts.length === 0) {
      doc.setFontSize(12);
      doc.text("No active alerts.", 25, 180);
    } else {
      alerts.slice(0, 5).forEach((alert, index) => {
        doc.text(
          `${index + 1}. ${alert.title} - ${alert.status}`,
          25,
          180 + index * 7
        );
      });
    }

    /* ================= FOOTER ================= */

    doc.setDrawColor(200);
    doc.line(20, 260, 190, 260);

    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      20,
      268
    );

    doc.text("Authorized Signature: ____________________", 120, 280);

    // ✅ SAVE ONLY HERE
   const pdfBlob = doc.output("blob");
const pdfUrl = URL.createObjectURL(pdfBlob);

window.open(pdfUrl, "_blank");
  };
};

  /* ===============================
     ROUTING LOGIC
  =============================== */

  if (!patient) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PatientForm onSave={setPatient} />
      </ThemeProvider>
    );
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardPage
        vitals={vitals}
        alerts={alerts}
        riskScore={riskScore}
        patient={patient}
        generateAlert={generateAlert}
        exportReport={exportReport}
        simulateEmergency={simulateEmergency}
        updateStatus={updateStatus}
        toggleTheme={() =>
          setMode(mode === "light" ? "dark" : "light")
        }
        clearPatient={clearPatient}
      />
    </ThemeProvider>
  );
}
