# Ground Station – API Overview (Simple Version)

This is a simple list of endpoints needed for communication between:

- Frontend (Web GUI)
- Backend (Ground Station)
- Jetson (Mission Brain)

---

## 1. Commands (Frontend → Backend)

POST /command

- Send normal commands (start, pause, resume, flight_plan, arm, disarm)

POST /emergency_stop

- Trigger emergency state immediately

---

## 2. Command Retrieval (Jetson → Backend)

GET /command

- Jetson polls this endpoint to get latest command
- Also returns current system state

---

## 3. Inspection Data (Jetson → Backend)

POST /inspection

- Send vision inspection result after each step

GET /inspections

- Frontend fetches list of all inspections

GET /inspection/`<id>`

- Frontend fetches full details for one inspection

---

## 4. Telemetry (Jetson → Backend)

POST /telemetry

- Jetson sends altitude, battery, mission state, etc.

GET /telemetry

- Frontend fetches latest telemetry data

---

## 5. System Status

GET /system_status

- Returns overall system state (IDLE, RUNNING, EMERGENCY, etc.)

---

# System States

- IDLE
- ARMED
- RUNNING
- PAUSED
- EMERGENCY

---

# Notes

- Backend is the source of truth for mission state.
- Jetson polls /command regularly.
- Emergency state overrides everything.
