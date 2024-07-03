import { Container, IconButton, Modal } from "@mui/material"
import { useState } from "react"
import { TeamMemberModel } from "../../../gql/models/team-member.model"
import { ModalCloseEvent } from "../../../shared/models/modal-close-event.model"
import { TeamMemberForm } from "../team-member-form/TeamMemberForm"
import { modalStyle } from "../../../shared/theme/modal-style"
import CloseIcon from "@mui/icons-material/Close"

export function useTeamMemberModal() {

  const [modalData, setModalData] = useState<{ open: boolean, teamMember?: TeamMemberModel }>({ open: false })

  const closeModal = () => setModalData({ open: false })
  const openModal = (teamMember: TeamMemberModel) => setModalData({ open: true, teamMember })

  return {
    modalData,
    openModal,
    closeModal
  }

}


interface TeamMemberModalProps {
  open: boolean,
  onClose: (task: ModalCloseEvent<TeamMemberModel>) => void,
  teamMember?: TeamMemberModel
}

export const TeamMemberModal = ({ onClose, open, teamMember }: TeamMemberModalProps) => {

  if (!teamMember)
    return <></>

  function onSubmit(formData: TeamMemberModel) {
    onClose({
      type: "submit",
      data: formData
    })
  }

  return (


    <Modal open={open} onClose={onClose}>

      <Container className="modal-container" maxWidth="sm" sx={{ ...modalStyle, backgroundColor: "white" }}>

        <div className="modal-topbar">

          <div className="modal-title">
            Insert team member
          </div>
          <IconButton onClick={() => onClose({ type: "close" })} color="error">
            <CloseIcon />
          </IconButton>

        </div>

        <Container maxWidth="sm" sx={{ backgroundColor: "white", p: 2 }}>
          <TeamMemberForm onSubmit={onSubmit} teamMember={teamMember} />
        </Container>

      </Container>

    </Modal>

  )

}


