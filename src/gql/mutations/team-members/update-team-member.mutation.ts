import { gql, useMutation } from "@apollo/client"

export const UPDATE_TEAM_MEMBER_MUTATION =  gql`
mutation UpdateTeamMember($id: uuid!, $name: String) {
  update_team_members_by_pk(
    pk_columns: { id: $id }
    _set: {
      name: $name,
    }
  ) {
    id
    name
  }
}
`


export const useUpdateTeamMember = () => {
  const [mutation, meta] = useMutation(UPDATE_TEAM_MEMBER_MUTATION)

  function updateTeamMember(id: string, name: string){

    return mutation({

      variables: {

        id,
        name,

      }
    })



  }

  return [
    updateTeamMember,
    meta
  ] as const


}