import { IconButton } from "@mui/material"
import { TaskPlaceholder } from "../../task"
import "../task-column/TaskColumn.sass"
import AddIcon from "@mui/icons-material/Add"

interface TaskColumnPlaceholderProps {
  name: string
}

export function TaskColumnPlaceholder({ name }: TaskColumnPlaceholderProps) {

  return (
    <div className="column column-card" onDragOver={(e) => e.preventDefault()} >

      <div className="column-header">

        <span className="column-title">
          {name}
        </span>

        <IconButton className="add-task-button" aria-label="insert a new task">
          <AddIcon />
        </IconButton>

      </div>

      <div className="tasks">

        {
          new Array(10)
            .fill(1)
            .map((_, index) => <TaskPlaceholder key={index} />)
        }

      </div>

    </div>
  )

}