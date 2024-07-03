import { useAbsenceModal, useTeamMemberModal } from "../../components"
import { AbsenceModel, TeamMemberModel, useInsertAbsence, useInsertTeamMember } from "../../gql"
import { ModalCloseEvent } from "../../shared/models/modal-close-event.model"

export function createAbsenceFormData(team_member_id: string){
  return {
    start_date: new Date().toISOString().substring(0, 10),
    end_date: new Date().toISOString().substring(0, 10),
    team_member_id,
  }
}

export function useAbsenceActions(snackbarCallback: (message: string, type: "positive" | "negative") => void){

  const { modalData, closeModal, openModal } = useAbsenceModal()
  const [insertAbsence] = useInsertAbsence({
    onCompleted: () => snackbarCallback("Absence inserted", "positive"),
    onError: () => snackbarCallback("Unable to insert absence", "negative")
  })
  
  async function handleAbsenceModalClosed(event: ModalCloseEvent<Pick<AbsenceModel, "start_date" | "end_date" | "team_member_id"> & { absence_type_id: string }>) {

    closeModal()

    if (event.type != "submit")
      return

    try {
      const {team_member_id, start_date, end_date, absence_type_id} = event.data
      await insertAbsence(team_member_id, start_date, end_date, absence_type_id)  
    } catch (error) {
      console.error(error)
    }
    
  }

  async function handleAddAbsenceClick(teamMember: TeamMemberModel){
    openModal(createAbsenceFormData(teamMember.id))
  }

  return {

    absenceModalData: modalData,
    handleAbsenceModalClosed,
    handleAddAbsenceClick

  }


}

export function useTeamMemberActions(snackbarCallback: (message: string, type: "positive" | "negative") => void){

  const {modalData, openModal, closeModal } = useTeamMemberModal()
  const [insertTeamMember] = useInsertTeamMember({
    onCompleted: () => snackbarCallback("Team member inserted", "positive"),
    onError: () => snackbarCallback("Unable to insert team member", "negative")
  })

  async function handleTeamMemberModalClosed(event: ModalCloseEvent<TeamMemberModel>){

    closeModal()

    if (event.type != "submit")
      return

    try {
      const {name} = event.data
      await insertTeamMember(name)  
    } catch (error) {
      console.error(error)
    }
    
  }

  async function handleAddTeamMemberClick(){
    openModal({id: "", name: ""})
  }

  return {

    teamMemberModalData: modalData,
    handleTeamMemberModalClosed,
    handleAddTeamMemberClick

  }


}