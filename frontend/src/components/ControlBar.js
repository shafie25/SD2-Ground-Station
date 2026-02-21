function ControlBar({ status, onStart, onEmergency, getStateColor }) {
  return (
    <div className="control-bar">
      <span className="system-state">
        System State:
        <span
          style={{
            marginLeft: "10px",
            color: getStateColor()
          }}
        >
          {status ? status.system_state : "Loading..."}
        </span>
      </span>

      <button onClick={onStart} className="start-button">
        START INSPECTION
      </button>

      <button onClick={onEmergency} className="emergency-button">
        EMERGENCY STOP
      </button>
    </div>
  );
}

export default ControlBar;