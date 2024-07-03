import CloseIcon from "@mui/icons-material/Close"
import { Container, IconButton, Modal } from "@mui/material"
import { useState } from "react"
import { ModalCloseEvent } from "../../../shared/models/modal-close-event.model"
import { modalStyle } from "../../../shared/theme/modal-style"
import { AbsenceForm, AbsenceFormData } from "../absence-form/AbsenceForm"

export function useAbsenceModal() {

  const [modalData, setModalData] = useState<{ open: boolean, absence?: Omit<AbsenceFormData, "absence_type_id"> }>({ open: false })

  const closeModal = () => setModalData({ open: false })
  const openModal = (absence: Omit<AbsenceFormData, "absence_type_id">) => setModalData({ open: true, absence })

  return {

    modalData,
    openModal,
    closeModal

  }

}

interface AbsenceModalProps {
  open: boolean,
  onClose: (absence: ModalCloseEvent<AbsenceFormData>) => void,
  absence?: Omit<AbsenceFormData, "absence_type_id">,
}

export const AbsenceModal = ({ open, onClose, absence }: AbsenceModalProps) => {

  function onSubmit(formData: AbsenceFormData) {
    onClose({
      type: "submit",
      data: formData
    })
  }

  if (!absence)
    return <></>

  return (


    <Modal open={open} onClose={onClose}>

      <Container className="modal-container" maxWidth="sm" sx={{ ...modalStyle, backgroundColor: "white" }}>

        <div className="modal-topbar">

          <div className="modal-title">
            Insert absence
          </div>
          <IconButton onClick={() => onClose({ type: "close" })} color="error">
            <CloseIcon />
          </IconButton>

        </div>

        <Container maxWidth="sm" sx={{ backgroundColor: "white", p: 2 }}>
          <AbsenceForm onSubmit={onSubmit} absence={absence} />
        </Container>

      </Container>

    </Modal>



  )
}