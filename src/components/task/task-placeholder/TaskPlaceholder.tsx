import {  AttachmentOutlined, ChatBubbleOutline, EditOutlined } from "@mui/icons-material"
import "../task/Task.sass"


export function TaskPlaceholder(){

  return <div className="task-card">
  
  <div className="task-info">
    
    <div className="task-title shimmer">
    </div>

    <div className="task-description shimmer">
    </div>
    
    <div className="task-labels">
      <div className="task-label-placeholder">&nbsp;</div>
    </div>

  </div>

  <div className="task-sidebar">
    <EditOutlined className="task-action" />
    <ChatBubbleOutline className="task-action"/>
    <AttachmentOutlined className="task-action" />
    <div className="story-points">&nbsp;</div>
  </div>

  </div>

}