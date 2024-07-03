import { MutationHookOptions, gql, useMutation } from "@apollo/client"
import { TaskModel } from "../../models"

export const UPDATE_TASK_MUTATION =  gql`
mutation UpdateTask($id: uuid!, $name: String, $description: String, $story_points: Int, $order: Int) {
  update_tasks_by_pk(
    pk_columns: { id: $id }
    _set: {
      name: $name,
      description: $description,
      story_points: $story_points,
      order: $order
    }
  ) {
    id
    name
    description
    story_points
    order
  }
}
`

export const useUpdateTask = (options?: MutationHookOptions) => {
  const [mutation, meta] = useMutation<{update_tasks_by_pk: TaskModel}>(UPDATE_TASK_MUTATION, options)

  function updateTask(id: string, name: string, description: string, story_points: number, order: number){

    return mutation({

      optimisticResponse: {
        update_tasks_by_pk: {
          id,
          name,
          description,
          story_points,
          order
        },
      },

      variables: {
        id,
        name,
        description,
        story_points,
        order
      }
    })

  }

  return [
    updateTask,
    meta
  ] as const

}