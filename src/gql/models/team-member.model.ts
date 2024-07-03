import { AbsenceModel } from "./absence.model"
import { Entity } from "./entity.model"

export interface TeamMemberModel extends Entity {
  name: string
}

export interface TeamMemberWithAbsencesModel extends TeamMemberModel {
  absences: AbsenceModel[]
}