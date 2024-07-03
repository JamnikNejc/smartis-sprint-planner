import { AbsenceModel } from "../../gql/models/absence.model"
import { TeamMemberWithAbsencesModel } from "../../gql/models/team-member.model"

// Calculate the total number of days in an interval assuming the end date is included
function calculateTotalDays(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

// Merge overlapping absences for a single team member
function mergeAbsences(absences: AbsenceModel[]): AbsenceModel[] {
  
  if (absences.length == 0) 
    return []

  // Sort absences by start_date
  const sorted = [...absences].sort((a, b) => a.start_date.localeCompare(b.start_date))

  const merged: AbsenceModel[] = []
  let currentAbsence = { ...sorted[0] }

  for (let i = 1; i < sorted.length; i++) {
    const nextAbsence = sorted[i]

    if (nextAbsence.start_date <= currentAbsence.end_date) {
      // Overlapping or contiguous intervals, merge them
      currentAbsence.end_date = nextAbsence.end_date > currentAbsence.end_date ? nextAbsence.end_date : currentAbsence.end_date
    } else {
      // No overlap, push the current interval and start a new one
      merged.push(currentAbsence)
      currentAbsence = { ...nextAbsence }
    }
  }

  // Push the last interval
  merged.push(currentAbsence) 

  return merged
}

// Calculate the number of days covered by absences within the interval
function calculateAbsenceDays(absences: AbsenceModel[], intervalStart: string, intervalEnd: string): number {
  let totalAbsenceDays = 0

  absences.forEach((absence) => {
    const absenceStart = absence.start_date
    const absenceEnd = absence.end_date

    // No overlap
    if (absenceEnd < intervalStart || absenceStart > intervalEnd)
      return 

    const overlapStart = intervalStart > absenceStart ? intervalStart : absenceStart
    const overlapEnd = intervalEnd < absenceEnd ? intervalEnd : absenceEnd

    totalAbsenceDays += calculateTotalDays(overlapStart, overlapEnd)
  })

  return totalAbsenceDays
}

// Calculate available days by subtracting absence days from total days
export function calculateAvailableDays( intervalStart: string, intervalEnd: string, teamMembers: TeamMemberWithAbsencesModel[]): number {

  if(intervalStart > intervalEnd)
    return 0

  const totalDays = calculateTotalDays(intervalStart, intervalEnd)

  // sum absence days for each team member
  const totalAbsenceDays = teamMembers.reduce((totalAbsenceDays, teamMember) => {
    const mergedAbsences = mergeAbsences(teamMember.absences)
    const teamMemberAbsenceDays = calculateAbsenceDays(mergedAbsences, intervalStart, intervalEnd)
    return totalAbsenceDays + teamMemberAbsenceDays
  }, 0)

  return (totalDays * teamMembers.length) - totalAbsenceDays
}


