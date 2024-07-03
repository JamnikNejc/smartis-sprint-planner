import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export const TeamMembersTablePlaceholder = () => {


  return (
    <TableContainer component={Paper}>
    <Table>

      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Next absence</TableCell>
          <TableCell>Add an absence</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {new Array(10).fill(0).map((_, index) => {
          return (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
              <TableCell component="th" scope="row"> 
                <div className="placeholder shimmer">
                  &nbsp;
                </div>  
              </TableCell>
              <TableCell>
                <div className="placeholder shimmer">
                  &nbsp;
                </div>
              </TableCell>
              
              <TableCell align="right">
                &nbsp;
              </TableCell>

            </TableRow>
          )
        })}
      </TableBody>

    </Table>
  </TableContainer>
  )
}
