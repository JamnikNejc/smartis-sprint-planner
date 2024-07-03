import { IconButton } from "@mui/material"
import { TaskModel } from "../../../gql"
import { DragEvent } from "../../../pages/sprint-planner/SprintPlannerPage"
import { Task } from "../../task"
import AddIcon from "@mui/icons-material/Add"

export interface TaskColumnProps {

  id: number,
  name: string,
  tasks: TaskModel[],

  drag: (e: React.DragEvent, task: TaskModel, column: number) => void,
  drop: (e: React.DragEvent, column: number) => void,
  onEditTaskClicked: (task: TaskModel) => void,
  onInsertTaskClicked: () => void,

  dragEvent: DragEvent | null

}

export function TaskColumn({ tasks, name, id, drag, drop, dragEvent, onEditTaskClicked, onInsertTaskClicked }: TaskColumnProps) {

  return (
    <div className="column" onDragOver={(e) => e.preventDefault()} >

      <div className="column-header">

        <span className="column-title">
          {name}
        </span>

        {/* tasks can only be added into the backlog */}
        {id == 1 &&
          <IconButton onClick={onInsertTaskClicked} className="add-task-button" aria-label="insert a new task">
            <AddIcon />
          </IconButton>
        }

      </div>

      <div className={`tasks ${dragEvent?.column == id ? "drag-overlay" : ""} ${dragEvent && dragEvent.column != id ? "drop-overlay" : ""}`} onDrop={(e) => { drop(e, id) }}>
        {
          tasks.map((task) =>
            <Task key={task.id} onEditTaskClicked={onEditTaskClicked} onDragStart={(e: React.DragEvent) => { drag(e, task, id) }} task={task} />
          )
        }
      </div>

    </div>
  )

}