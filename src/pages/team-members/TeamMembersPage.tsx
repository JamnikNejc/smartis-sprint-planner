import AddIcon from "@mui/icons-material/Add"
import { Button, Snackbar } from "@mui/material"
import { TeamMembersTable, TeamMembersTablePlaceholder } from "../../components"
import { AbsenceModal } from "../../components/absence/absence-modal/AbsenceModal"
import { TeamMemberModal } from "../../components/team-member/team-member-modal/TeamMemberModal"
import { useGetTeamMembersWithAbsences } from "../../gql"
import { useSnackbar } from "../../shared/hooks/useSnackbar.hook"
import { useAbsenceActions, useTeamMemberActions } from "./TeamMemberPageController"
import "./TeamMembersPage.sass"

export function TeamMembersPage() {

  // snackbar
  const {openSnackbar, snackbarProps} = useSnackbar()

  // team members
  const { data: teamMembers, error, loading } = useGetTeamMembersWithAbsences({
    onError: () => openSnackbar("Unable to load team members", "negative")
  })

  // team member modal
  const {teamMemberModalData, handleAddTeamMemberClick, handleTeamMemberModalClosed} = useTeamMemberActions(openSnackbar)
 
  // absence modal
  const { absenceModalData, handleAddAbsenceClick, handleAbsenceModalClosed } = useAbsenceActions(openSnackbar)
  
  if (error)
    return <></> 

  return (

    <>
      <Button className="add-team-member-button" size="small" onClick={handleAddTeamMemberClick} variant="contained" endIcon={<AddIcon />}>
        Add team member
      </Button>

      {loading && <TeamMembersTablePlaceholder />}
      {!loading && teamMembers && <TeamMembersTable openAbsenceModal={handleAddAbsenceClick} teamMembers={teamMembers?.team_members ?? []} />}

      <TeamMemberModal onClose={handleTeamMemberModalClosed}  {...teamMemberModalData} />
      <AbsenceModal onClose={handleAbsenceModalClosed} {...absenceModalData} />
      <Snackbar {...snackbarProps}/>
    </>

  )


}
