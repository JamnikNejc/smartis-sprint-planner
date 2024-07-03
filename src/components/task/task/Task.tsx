import { AttachmentOutlined, ChatBubbleOutline, EditOutlined } from "@mui/icons-material"

import { IconButton } from "@mui/material"
import { useState } from "react"
import { TaskModel } from "../../../gql"
import { isMobile } from "../../../shared/util/isMobile"
import "./Task.sass"

export interface TaskProps {

  task: TaskModel,
  onDragStart: (e: React.DragEvent) => void
  onEditTaskClicked: (task: TaskModel) => void

}

export function Task({task, onDragStart, onEditTaskClicked}: TaskProps){

  // disable dragging if user is on a moblie device
  const [mobile] = useState(isMobile())
  
  return <div className="task-card" draggable={!mobile} onDragStart={onDragStart}>
  
  <div className="task-info">
    
    <div className="task-title">
      {task.name}
    </div>

    <div className="task-description">
      {task.description}
    </div>
    
    <div className="task-labels">
      <div className="task-label bug">urgent</div>
      <div className="task-label enhancement">won't fix</div>
    </div>

  </div>

  <div className="task-sidebar">
    <IconButton onClick={() => onEditTaskClicked(task)} className="task-action">
      <EditOutlined  />
    </IconButton>

    <IconButton className="task-action">
      <ChatBubbleOutline className="task-action"/>
    </IconButton>

    <IconButton className="task-action">
      <AttachmentOutlined className="task-action" />
    </IconButton>
    <div className="story-points">{task.story_points}SP</div>
  </div>

  </div>

}