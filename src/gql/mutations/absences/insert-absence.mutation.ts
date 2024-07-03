import { MutationHookOptions, gql, useMutation } from "@apollo/client"
import { AbsenceModel } from "../../models/absence.model"
import { TeamMemberWithAbsencesModel } from "../../models/team-member.model"
import { GET_TEAM_MEMBERS_WITH_ABSENCES } from "../../queries"

export const INSERT_ABSENCE_MUTATION = gql`
  mutation InsertAbsence($start_date: date!, $end_date: date!, $team_member_id: uuid!, $absence_type_id: uuid!) {
    insert_absences_one(object: { start_date: $start_date, end_date: $end_date, team_member_id: $team_member_id, absence_type_id: $absence_type_id}) {
      id
      start_date
      end_date
      team_member_id
      absence_type {
        id
        type
      }

    }
  }
`

export const useInsertAbsence = (options?: MutationHookOptions) => {
  const [mutation, meta] = useMutation<{insert_absences_one: AbsenceModel}>(INSERT_ABSENCE_MUTATION, options)

  function insertAbsence(team_member_id: string, start_date: string, end_date: string, absence_type_id: string){

    return mutation({

      update(cache, { data }) {

        // mutation didn't return data -> im not sure this can actually happen
        if (!data)
          return

        const cachedTeamMembersData = cache.readQuery<{ team_members: TeamMemberWithAbsencesModel[] }>({ query: GET_TEAM_MEMBERS_WITH_ABSENCES })
        const cachedTeamMembers = cachedTeamMembersData?.team_members ?? []
        const insertedAbsence = data.insert_absences_one

        // updated cached team member to include inserted absence
        const updatedTeamMembers = cachedTeamMembers.map((member) => {
          if (member.id === insertedAbsence.team_member_id) {
            return {
              ...member,
              absences: [...member.absences, insertedAbsence],
            }
          }
          return member
        })

        // updated cache
        cache.writeQuery({
          query: GET_TEAM_MEMBERS_WITH_ABSENCES,
          data: { team_members: updatedTeamMembers },
        })

      },

      variables: {

        team_member_id: team_member_id,
        start_date: start_date,
        end_date: end_date,
        absence_type_id: absence_type_id

      }
    })



  }

  return [
    insertAbsence,
    meta
  ] as const


}