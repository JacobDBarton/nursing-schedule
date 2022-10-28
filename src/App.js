import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import ShiftsTable from "./components/ShiftsTable";
import ShiftAssignmentDialog from "./components/ShiftAssignmentDialog";

const API_URL = "http://localhost:9001";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [shiftsData, setShiftsData] = useState([]);
  const [nursesData, setNursesData] = useState([]);

  useEffect(() => {
    // get the shifts data from the API
    const getShifts = async () => {
      const response = await fetch(`${API_URL}/shifts`);
      const data = await response.json();
      setShiftsData(data);
    };
    // get the nurses data from the API
    const getNurses = async () => {
      const response = await fetch(`${API_URL}/nurses`);
      const data = await response.json();
      setNursesData(data);
    };
    getShifts();
    getNurses();
  }, []);

  // use the useMemo hook to prevent creating a new shifts array on every render
  const shifts = useMemo(
    () =>
      shiftsData?.map((shiftData) => {
        // find the nurse assigned to the shift
        const assignedNurse = nursesData?.find(
          (nurse) => nurse.id === shiftData.nurse_id
        );
        // if nurse is assigned to shift, use the first & last name in the table
        let nurse = assignedNurse
          ? `${assignedNurse.first_name} ${assignedNurse.last_name}`
          : "";
        // if assigned nurse has a qualification, append it to their name
        if (assignedNurse?.qualification) {
          nurse += `, ${assignedNurse.qualification}`;
        }
        // return each shift in the correct format for the ShiftsTable component
        return {
          id: shiftData.id,
          name: shiftData.name,
          start: shiftData.start,
          end: shiftData.end,
          certificationRequired: shiftData.qual_required,
          nurse,
        };
      }),
    [nursesData, shiftsData]
  );

  return (
    <>
      <Button variant="outlined" onClick={() => setModalOpen(true)}>
        Set Shift Assignment
      </Button>
      {modalOpen ? (
        <ShiftAssignmentDialog
          shifts={shifts}
          nurses={nursesData}
          onCloseSignal={() => setModalOpen(false)}
        />
      ) : null}
      <ShiftsTable shifts={shifts} />
    </>
  );
};

export default App;
