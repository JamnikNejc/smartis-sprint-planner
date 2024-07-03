import { Container, IconButton, Modal } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react"
import { TaskModel } from "../../../gql/models/task.model"
import { ModalCloseEvent } from "../../../shared/models/modal-close-event.model"
import { TaskForm } from "../task-form/TaskForm"
import { modalStyle } from "../../../shared/theme/modal-style"

interface TaskModalProps {
  open: boolean,
  onClose: (task: ModalCloseEvent<TaskModel>) => void,
  task?: TaskModel,
  mode?: "insert" | "edit"
}

export function useTaskModal(){

  const [modalData, setModalData] = useState<{ open: boolean, task?: TaskModel, mode?: "insert" | "edit" }>({ open: false })
  
  const closeModal = () => setModalData({open: false})
  const openModal = (task: TaskModel, mode: "insert" | "edit") => setModalData({open: true, task: {...task}, mode})

  return {
    modalData,
    openModal,
    closeModal
  }

}

export const TaskModal = ({open, onClose, task, mode}: TaskModalProps) => {

  function onSubmit(formData: TaskModel){
    onClose({
      type: "submit",
      data: formData
    })
  }

  
  if(!task)
    return <></>

  return (
    
      <Modal open={open} onClose={onClose}>

        <Container className="modal-container" maxWidth="sm" sx={{  ...modalStyle ,backgroundColor: "white" }}>
          
          <div className="modal-topbar">

              <div className="modal-title">
                {mode} task
              </div>
              <IconButton onClick={() => onClose({type: "close"})} color="error">
                  <CloseIcon  />
              </IconButton>

          </div>

          <Container maxWidth="sm" sx={{ backgroundColor: "white", p: 2 }}>
            <TaskForm onSubmit={onSubmit}  task={task} />
          </Container>
          
        </Container>

      </Modal>

  )
}
