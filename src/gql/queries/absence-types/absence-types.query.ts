import { gql, useQuery } from "@apollo/client"
import { AbsenceType } from "../models/absence-type.model"

export const GET_ABSENCE_TYPES = gql`query GetAbsenceTypes {
  absence_types {
    id
    type
  }
}
`

export const useGetAbsenceTypes = () => useQuery<{ absence_types: AbsenceType[] }>(GET_ABSENCE_TYPES)
