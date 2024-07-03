import { Snackbar } from "@mui/material"
import { SprintGenerator, TaskColumn, TaskColumnPlaceholder, TaskModal, useTaskModal } from "../../components"
import { TaskModel, useIncrementTasksOrder, useInsertTask, useUpdateTask } from "../../gql"
import { useSnackbar } from "../../shared/hooks/useSnackbar.hook"
import { ModalCloseEvent } from "../../shared/models/modal-close-event.model"
import "./SprintPlannerPage.sass"
import { createEmptyTask, useDragAndDrop, useTasks } from "./SprintPlannerPageController"

export function SprintPlannerPage() {

  const {openSnackbar, snackbarProps} = useSnackbar()

  // component state
  const { sprintTasks, backlogTasks, handleDropEvent, generateSprint, loading, findNextTaskOrder, isTaskOrderTaken, error } = useTasks()
  
  // display snackbar if there was an error fetching tasks
  if(error)
    openSnackbar("Unable to load tasks", "negative")

  // drag and drop
  const {onDragStart, dragEvent, onDrop} = useDragAndDrop(handleDropEvent)

  // tasks api
  const [incrementTasksOrder] = useIncrementTasksOrder()

  const [updateTask] = useUpdateTask({
    onCompleted: () => openSnackbar("Task updated", "positive"),
    onError: () => openSnackbar("Unable to update task", "negative")
  })

  const [insertTask] = useInsertTask({
    onCompleted: () => openSnackbar("Task inserted", "positive"),
    onError: () => openSnackbar("Unable to insert task", "negative")
  })

  // task modal
  const { openModal: openTaskModal, closeModal: closeTaskModal, modalData: taskModalData } = useTaskModal()
  async function onTaskModalClosed(event: ModalCloseEvent<TaskModel>){
    closeTaskModal()

    if(event.type != "submit")
      return

    // if the 'order' property is already taken, increment all tasks where order >= event.data.order
    if(isTaskOrderTaken(event.data.order, event.data.id))
      await incrementTasksOrder(event.data.order)

    const {id, description, name, order, story_points} = event.data
    // update existing task
    if(id)
      updateTask(id, name, description ?? "", story_points, order)
    // insert new task
    else
      insertTask(name, description ?? "", story_points, order)

  }

  function onInsertTaskClicked(){
    const nextOrder = findNextTaskOrder()
    openTaskModal(createEmptyTask(nextOrder), "insert")
  }

  return <>

    <div className="self-center sprint-planner grid-container">

      {(loading || error) &&
        <TaskColumnPlaceholder name="Backlog" />
      }

      {!loading && !error &&
        <TaskColumn onInsertTaskClicked={onInsertTaskClicked} name="Backlog" id={1} tasks={backlogTasks} drag={onDragStart} drop={onDrop} dragEvent={dragEvent} onEditTaskClicked={task => openTaskModal(task, "edit")}></TaskColumn>
      }

      <TaskColumn onInsertTaskClicked={onInsertTaskClicked} name="Sprint" id={2} tasks={sprintTasks} drag={onDragStart} drop={onDrop} dragEvent={dragEvent} onEditTaskClicked={task => openTaskModal(task, "edit")}></TaskColumn>
      <SprintGenerator sprintTasks={sprintTasks} generateSprint={generateSprint} />

      <TaskModal onClose={onTaskModalClosed} {...taskModalData} />

      <Snackbar {...snackbarProps} />
    </div>

  </>

}