import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ShiftsTable(props) {
  const { shifts = [] } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Shift</TableCell>
            <TableCell align="right">Start time</TableCell>
            <TableCell align="right">End time</TableCell>
            <TableCell align="right">Certification Required</TableCell>
            <TableCell align="right">Assigned nurse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts.map((shift) => (
            <TableRow
              key={shift.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {shift.name}
              </TableCell>
              <TableCell align="right">
                {new Date(shift.start).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {new Date(shift.end).toLocaleString()}
              </TableCell>
              <TableCell align="right">{shift.certificationRequired}</TableCell>
              <TableCell align="right">{shift.nurse}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
