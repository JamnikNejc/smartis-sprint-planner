import { AbsenceTypeEnum } from "../../gql"

export function absenceTypeToLabel(absenceType: AbsenceTypeEnum){

  const labels = {
    [AbsenceTypeEnum.ANNUAL_LEAVE]: "Annual leave",
    [AbsenceTypeEnum.SICK_LEAVE]: "Sick leave",
    [AbsenceTypeEnum.JOB_INTERVIEW]: "Job interview"
  }

  return labels[absenceType] ?? "Unknown absence type"

}