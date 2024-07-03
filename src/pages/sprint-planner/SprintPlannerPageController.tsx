import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_TASKS_QUERY, TaskModel } from "../../gql/index"

export interface DragEvent { task: TaskModel, column: number }

interface DropEvent {

  task: TaskModel,
  dropColumn: number
  dragColumn: number

}
export function useTasks(){

  const [tasks, setTasks] = useState({
    backlogTasks: [] as TaskModel[],
    sprintTasks: [] as TaskModel[]
  })

  const sprintTasks = tasks.sprintTasks
  const backlogTasks = tasks.backlogTasks

  const {data, loading, error} = useQuery<{tasks: TaskModel[]}>(GET_TASKS_QUERY)
  
  useEffect(() => {

    // tasks changed -> initial load or edit / insert
    if(data){

      // create a map <taskId, task> of tasks that are currently in the sprint
      const sprintTasksIds = sprintTasks.reduce((map, task) => {

        map.set(task.id, task)

        return map
      }, new Map<string, TaskModel>())

      // update state
      const {sprint, backlog} = data.tasks.reduce((tasks, task) => {

        // task was previously in sprint
        if(sprintTasksIds.has(task.id))
          tasks.sprint.push(task)
        else
          tasks.backlog.push(task)

        return tasks

      }, {backlog: [] as TaskModel[], sprint: [] as TaskModel[]})

      setTasks({
        sprintTasks: sprint,
        backlogTasks: backlog
      })

    }

  }, [data])

  // Check the local state to find the next task 'order'
  function findNextTaskOrder(){

    const maxBacklogTaskOrder = backlogTasks.reduce((maxOrder, task) => Math.max(task.order, maxOrder), 0)
    const maxSprintTaskOrder = sprintTasks.reduce((maxOrder, task) => Math.max(task.order, maxOrder), 0)

    return Math.max(maxBacklogTaskOrder, maxSprintTaskOrder) + 1

  }

  // Check local state to see if a task with the desired 'order' already exists
  function isTaskOrderTaken(order: number, taskId: string){
    return backlogTasks.some(task => task.order == order && task.id != taskId) || sprintTasks.some(task => task.order == order && task.id != taskId)
  }

  function moveTasksBetweenColumns(sourceTasks: TaskModel[], destTasks: TaskModel[], task: TaskModel){

    const taskIndex = sourceTasks.findIndex(t => t.id == task.id)
    if(taskIndex < 0)
      throw new Error("selected task not found in source tasks")

    // remove the moved task from the source column
    sourceTasks.splice(taskIndex, 1)

    // find position for moved task in new column
    const firstTaskWithHigherOrderIndex = destTasks.findIndex((t) => t.order > task.order) 

    // the added tasks has the highest order -> add to end of tasks
    if(firstTaskWithHigherOrderIndex < 0 )
      destTasks.push(task)
    else
      destTasks.splice(firstTaskWithHigherOrderIndex, 0, task)

  }

  function handleDropEvent(dropEvent: DropEvent){
  
    const {dragColumn, dropColumn, task} = dropEvent

    if(dragColumn == dropColumn)
      return
  
    // task was dragged from backlog -> sprint
    if(dragColumn == 1)
      moveTasksBetweenColumns(backlogTasks, sprintTasks, task)
    // task was dragged from sprint -> backlog
    else
      moveTasksBetweenColumns(sprintTasks, backlogTasks, task)

    // re-render tasks
    setTasks({
      sprintTasks: [...sprintTasks],
      backlogTasks: [...backlogTasks]
    })
  
  }

  function generateSprint(storyPoints: number){

    const sprint = backlogTasks.reduce((sprint, task) => {

      if(task.story_points <= sprint.remainingStoryPoints){
        sprint.remainingStoryPoints -= task.story_points
        sprint.sprintTasks.push(task)
      }

      return sprint
    }, { sprintTasks: [] as TaskModel[], remainingStoryPoints: storyPoints })

    sprint.sprintTasks.forEach(task => moveTasksBetweenColumns(backlogTasks, sprintTasks, task))

    setTasks({
      sprintTasks: [...sprintTasks],
      backlogTasks: [...backlogTasks]
    })

  }

  return {loading, error, backlogTasks, sprintTasks, handleDropEvent, generateSprint, findNextTaskOrder, isTaskOrderTaken}


}

export function useDragAndDrop(dropEffect: (event: DropEvent) => void){

  const [dragEvent, setDragEvent] = useState<DragEvent | null>(null)

  useEffect(() => {

    const handleDrop = () => {
      setDragEvent(null)
    }

    window.addEventListener("dragend", handleDrop)
    window.addEventListener("drop", handleDrop)

    return () => {
      window.removeEventListener("dragend", handleDrop)
      window.removeEventListener("drop", handleDrop)
    }

  }, [])

  function onDragStart(e: React.DragEvent, task: TaskModel, column: number) {
    const dragEvent = { task: task, column: column }
    e.dataTransfer.setData("drag-start", JSON.stringify(dragEvent))
    setDragEvent(dragEvent)
  }

  function onDrop(e: React.DragEvent, dropColumn: number) {
    const dragEvent: DragEvent = JSON.parse(e.dataTransfer.getData("drag-start"))
    if (!dragEvent)
      return

    if (dragEvent.column == dropColumn)
      return

    dropEffect({ task: dragEvent.task, dragColumn: dragEvent.column, dropColumn })
  }

  return {
    onDrop,
    onDragStart,
    dragEvent
  }

}

export function createEmptyTask(order: number){

  return {
    id: "",
    description: "",
    name: "",
    order,
    story_points: 0
  }

}