function VisionPanel({ selectedInspection }) {
  return (
    <div className="panel">
      <h3>Vision Results</h3>

      {selectedInspection ? (
        <>
          {selectedInspection.image_url && (
            <img
              src={`http://localhost:5000${selectedInspection.image_url}`}
              alt="Inspection"
              width="100%"
            />
          )}

          <p>
            Crack Detected:{" "}
            {selectedInspection.has_crack ? "Yes" : "No"}
          </p>
          <p>Confidence: {selectedInspection.confidence}</p>
        </>
      ) : (
        <p>No inspection selected.</p>
      )}
    </div>
  );
}

export default VisionPanel;