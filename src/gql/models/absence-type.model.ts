export enum AbsenceTypeEnum {
  ANNUAL_LEAVE = "annual_leave",
  SICK_LEAVE = "sick_leave",
  JOB_INTERVIEW = "job_interview"
}

export interface AbsenceTypeModel {
    id: string,
    type: AbsenceTypeEnum
}