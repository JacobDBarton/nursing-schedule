import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const API_URL = "http://localhost:9001";

export default function ShiftAssignmentDialog(props) {
  const { shifts = [], nurses = [], onCloseSignal, onAssignment } = props;
  const [shiftId, setShiftId] = useState("");
  const [nurseId, setNurseId] = useState("");

  const handleShiftChange = (event) => {
    setShiftId(event.target.value);
  };

  const handleNurseChange = (event) => {
    setNurseId(event.target.value);
  };

  const handleSaveAssignment = async () => {
    // update the shifts data in the App component when a nurse is assigned to a shift
    onAssignment({ shiftId, nurseId });
    // make the request to update the shift with the selected nurse
    // NOTE: can't figure out why this keeps giving me a 500 error, the server
    // doesn't like something about this
    await fetch(`${API_URL}/shifts/${shiftId}`, {
      method: "PUT",
      body: JSON.stringify({ nurseID: nurseId }),
    });
    // if request is successful, close the dialog
    onCloseSignal();
  };

  return (
    <Dialog open onClose={onCloseSignal}>
      <DialogTitle>Set Shift Assignment</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl fullWidth sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="selected-shift-label">Shift</InputLabel>
            <Select
              labelId="selected-shift-label"
              id="selected-shift"
              value={shiftId}
              label="Shift"
              onChange={handleShiftChange}
            >
              {shifts.map((shift) => (
                <MenuItem key={shift.id} value={shift.id}>
                  {shift.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="selected-nurse-label">Nurse</InputLabel>
            <Select
              labelId="selected-nurse-label"
              id="selected-nurse"
              value={nurseId}
              label="Nurse"
              onChange={handleNurseChange}
            >
              {nurses.map((nurse) => (
                <MenuItem key={nurse.id} value={nurse.id}>
                  {nurse.first_name} {nurse.last_name}
                  {nurse.qualification ? `, ${nurse.qualification}` : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveAssignment} disabled={!shiftId}>
          Save Assignment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
