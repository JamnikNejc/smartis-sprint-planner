import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { AbsenceModel, TeamMemberModel, TeamMemberWithAbsencesModel } from "../../../gql"
import { absenceTypeToLabel } from "../../../shared/util/absenceTypeToLabel"
import { formatISOString } from "../../../shared/util/formatIsoString"

interface TeamMemberTableProps {
  teamMembers: TeamMemberWithAbsencesModel[],
  openAbsenceModal: (teamMember: TeamMemberModel) => void
}

export const TeamMembersTable = ({teamMembers, openAbsenceModal}: TeamMemberTableProps) => {

  function getNextAbsence(teamMember: TeamMemberWithAbsencesModel){

    if(teamMember.absences.length == 0)
      return ""

    const nextAbsence = teamMember.absences.reduce((min, absence) => {

      // absence already ended
      if(absence.end_date < new Date().toISOString().substring(0, 10))
        return min

      if(!min || absence.start_date < min.start_date)
        return absence

      return min

    }, null as null | AbsenceModel)

    if(!nextAbsence)
      return ""

    return `${absenceTypeToLabel(nextAbsence.absence_type.type)} from ${formatISOString(nextAbsence.start_date)} to ${formatISOString(nextAbsence.end_date)}`

  }


  return (
    <TableContainer component={Paper}>
    <Table>

      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Next absence</TableCell>
          <TableCell align="right">
            Add an absence
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {teamMembers.map((row) => {
          return (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
              <TableCell component="th" scope="row"> {row.name} </TableCell>
              <TableCell>{getNextAbsence(row)}</TableCell>
              
              <TableCell align="right">

                <IconButton color="primary" onClick={() => openAbsenceModal(row)}>
                  <AddIcon  />
                </IconButton>
                
              </TableCell>

            </TableRow>
          )
        })}
      </TableBody>

    </Table>
  </TableContainer>
  )
}
