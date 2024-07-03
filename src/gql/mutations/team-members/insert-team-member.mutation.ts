import { MutationHookOptions, gql, useMutation } from "@apollo/client"
import { TeamMemberModel, TeamMemberWithAbsencesModel } from "../../models/team-member.model"
import { GET_TEAM_MEMBERS_WITH_ABSENCES } from "../../queries"

export const INSERT_TEAM_MEMBER_MUTATION = gql`
  mutation InsertTeamMember($name: String) {
    insert_team_members_one(object: { name: $name }) {
      id
      name
    }
  }
`

export const useInsertTeamMember = (options?: MutationHookOptions) => {
  const [mutation, meta] = useMutation<{insert_team_members_one: TeamMemberModel}>(INSERT_TEAM_MEMBER_MUTATION, options)

  function insertTeamMember(name: string){

    return mutation({

      update(cache, { data }) {

        if (!data)
          return

        const cachedTeamMembersData = cache.readQuery<{ team_members: TeamMemberWithAbsencesModel[] }>({ query: GET_TEAM_MEMBERS_WITH_ABSENCES })
        const cachedTeamMembers = cachedTeamMembersData?.team_members ?? []
        const insertedTeamMember = data.insert_team_members_one

        // updated cache to include new team member
        cache.writeQuery({
          query: GET_TEAM_MEMBERS_WITH_ABSENCES,
          data: { team_members: [...cachedTeamMembers, {...insertedTeamMember, absences: []}] },
        })

      },
      
      optimisticResponse: {
        insert_team_members_one: {
          id: "temp-id",
          name: name,
        },
      },

      variables: {
        name
      }
    })

  }

  return [
    insertTeamMember,
    meta
  ] as const


}