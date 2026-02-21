import { useEffect, useState } from "react";
import ControlBar from "./components/ControlBar";
import InspectionList from "./components/InspectionList";
import VisionPanel from "./components/VisionPanel";
import AcousticPanel from "./components/AcousticPanel";
import "./Dashboard.css";

function App() {
  const [status, setStatus] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState(null);

  // ----------------------------
  // Fetch System Status
  // ----------------------------
  const fetchStatus = () => {
    fetch("http://localhost:5000/system_status")
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(err => console.error(err));
  };

  // ----------------------------
  // Fetch Inspections
  // ----------------------------
  const fetchInspections = () => {
    fetch("http://localhost:5000/inspections")
      .then(res => res.json())
      .then(data => setInspections(data))
      .catch(err => console.error(err));
  };

  // ----------------------------
  // Poll Every 1 Second
  // ----------------------------
  useEffect(() => {
    fetchStatus();
    fetchInspections();

    const interval = setInterval(() => {
      fetchStatus();
      fetchInspections();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ----------------------------
  // Commands
  // ----------------------------
  const handleStart = () => {
    fetch("http://localhost:5000/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "start" })
    });
  };

  const handleEmergency = () => {
    fetch("http://localhost:5000/emergency_stop", {
      method: "POST"
    });
  };

  const getStateColor = () => {
    if (!status) return "black";
    if (status.system_state === "RUNNING") return "green";
    if (status.system_state === "EMERGENCY") return "red";
    if (status.system_state === "PAUSED") return "orange";
    return "gray";
  };

  return (
    <div className="app-container">
      <h1 className="title">
        Drone-Based Concrete Inspection – Ground Station
      </h1>

      {/* CONTROL BAR COMPONENT */}
      <ControlBar
        status={status}
        onStart={handleStart}
        onEmergency={handleEmergency}
        getStateColor={getStateColor}
      />

      {/* MAIN GRID */}
      <div className="grid-layout">
        {/* LEFT PANEL */}
        <InspectionList
          inspections={inspections}
          selectedInspection={selectedInspection}
          onSelect={setSelectedInspection}
        />

        {/* CENTER PANEL */}
        <VisionPanel selectedInspection={selectedInspection} />

        {/* RIGHT PANEL */}
        <AcousticPanel />
      </div>
    </div>
  );
}

export default App;
