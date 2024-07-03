import { gql } from "@apollo/client"

export const GET_TASKS_QUERY = gql`query GetTasks {
  tasks(order_by: { order: asc }) {
    id,
    name,
    description,
    order,
    story_points
  }
}
`
