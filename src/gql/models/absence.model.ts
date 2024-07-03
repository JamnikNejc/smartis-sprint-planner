import { AbsenceTypeModel } from "./absence-type.model"

export interface AbsenceModel {

  id: string
  team_member_id: string
  
  end_date: string
  start_date: string

  absence_type: AbsenceTypeModel

}