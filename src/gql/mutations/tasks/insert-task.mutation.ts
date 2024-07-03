import { MutationHookOptions, gql, useMutation } from "@apollo/client"
import { TaskModel } from "../../models/task.model"
import { GET_TASKS_QUERY } from "../../queries"

export const INSERT_TASK_MUTATION = gql`
  mutation InsertTask($name: String, $description: String, $order: Int!, $story_points: Int!) {
    insert_tasks_one(object: {name: $name, order: $order, story_points: $story_points, description: $description}) {
      id
      name
      description
      story_points
      order
    }
  }
`

export const useInsertTask = (options?: MutationHookOptions) => {
  const [mutation, meta] = useMutation<{insert_tasks_one: TaskModel}>(INSERT_TASK_MUTATION, options)

  function insertTask(name: string, description: string, story_points: number, order: number){

    return mutation({

      update(cache, { data }) {

        if (!data)
          return

        const cachedTasksData = cache.readQuery<{ tasks: TaskModel[] }>({ query: GET_TASKS_QUERY })
        const cachedTasks = cachedTasksData?.tasks ?? []
        const insertedTask = data.insert_tasks_one

        let insertedTaskPosition = cachedTasks.findIndex(task => task.order > insertedTask.order)
        // if the newly inserted task has the highest order
        if(insertedTaskPosition < 0)
          insertedTaskPosition = cachedTasks.length

        const updatedCacheData = [...cachedTasks]
        updatedCacheData.splice(insertedTaskPosition, 0, {...insertedTask})

        // updated cache
        cache.writeQuery({
          query: GET_TASKS_QUERY,
          data: { tasks: updatedCacheData },
        })

      },

      optimisticResponse: {
        insert_tasks_one: {
          id: "temp-id",  // Temporary ID
          name,
          description,
          story_points,
          order
        },
      },

      variables: {
        name,
        description,
        story_points,
        order
      }
    })

  }

  return [
    insertTask,
    meta
  ] as const

}