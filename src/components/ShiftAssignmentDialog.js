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

export default function ShiftAssignmentDialog(props) {
  const { shifts = [], nurses = [], onCloseSignal } = props;
  const [shiftId, setShiftId] = useState("");
  const [nurseId, setNurseId] = useState("");

  const handleShiftChange = (event) => {
    setShiftId(event.target.value);
  };

  const handleNurseChange = (event) => {
    setNurseId(event.target.value);
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
        <Button onClick={onCloseSignal} disabled={!shiftId}>
          Save Assignment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
