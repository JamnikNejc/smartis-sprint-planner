import { gql, useMutation } from "@apollo/client"
import { TaskModel } from "../../models/task.model"
import { GET_TASKS_QUERY } from "../../queries"

export const INCREMENT_TASKS_ORDER = gql`
  mutation IncrementOrder($newOrder: Int!) {
    update_tasks(
      where: { order: { _gte: $newOrder } },
      _inc: { order: 1 }
    ){
      affected_rows
    }
  }
`

export const useIncrementTasksOrder = () => {
  const [mutation, meta] = useMutation<object>(INCREMENT_TASKS_ORDER)

  function incrementTasksOrder(newOrder: number){

    return mutation({

      update(cache, { data }) {

        // mutation didn't return data -> im not sure this can actually happen
        if (!data)
          return

        const cachedTasksData = cache.readQuery<{ tasks: TaskModel[] }>({ query: GET_TASKS_QUERY })
        const cachedTasks = cachedTasksData?.tasks ?? []
        
        const updatedCacheData = cachedTasks.map((task) => {
          if(task.order >= newOrder)
            return {
              ...task,
              order: task.order + 1
            }

          return task

        })
        
        // updated cache
        cache.writeQuery({
          query: GET_TASKS_QUERY,
          data: { tasks: updatedCacheData },
        })

      },

      optimisticResponse: {
        update_tasks: {
          affected_rows: []
        }
      },

      variables: {
        newOrder
      }
    })

  }

  return [
    incrementTasksOrder,
    meta
  ] as const

}