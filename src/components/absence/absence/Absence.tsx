import { AbsenceModel } from "../../../gql"


interface AbsenceProps {
  absence: AbsenceModel
}

export const Absence = ({absence}: AbsenceProps) => {

  return (
    <div>
      Absent from {absence.start_date} to {absence.end_date} Reason {absence.absence_type.type}
    </div>
  )

}
