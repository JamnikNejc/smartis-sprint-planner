import { QueryHookOptions, gql, useQuery } from "@apollo/client"
import { TeamMemberModel, TeamMemberWithAbsencesModel } from "../../models/team-member.model"

export const GET_TEAM_MEMBERS_QUERY = gql`query GetTeamMembers {
  team_members {
    id,
    name,
  }
}
`

export const useGetTeamMembers = () => useQuery<{ team_members: TeamMemberModel[] }>(GET_TEAM_MEMBERS_QUERY)

export const GET_TEAM_MEMBERS_WITH_ABSENCES = gql`query GetTeamMembersWithAbsences {
  team_members {
    id
    name
    absences {
      id
      start_date
      end_date

      absence_type {
        id
        type
      }

    }
  }
}`

export const useGetTeamMembersWithAbsences = (options?: QueryHookOptions) => useQuery<{ team_members: TeamMemberWithAbsencesModel[] }>(GET_TEAM_MEMBERS_WITH_ABSENCES, options)
