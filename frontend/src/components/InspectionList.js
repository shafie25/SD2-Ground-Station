function InspectionList({ inspections, selectedInspection, onSelect }) {
    return (
        <div className="panel">
            <h3>Inspection List</h3>

            <ul>
                {inspections.map((inspection) => (
                    <li
                        key={inspection.inspection_id}
                        className={
                            selectedInspection?.inspection_id === inspection.inspection_id
                                ? "inspection-item inspection-selected"
                                : "inspection-item"
                        }
                        onClick={() => onSelect(inspection)}
                    >
                        ID: {inspection.inspection_id} | Height:{" "}
                        {inspection.height_cm} cm
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InspectionList;