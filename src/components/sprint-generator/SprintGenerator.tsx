import { useMemo, useState } from "react"
import { TaskModel, TeamMemberWithAbsencesModel, useGetTeamMembersWithAbsences } from "../../gql"
import { DateRangeInput, MultiselectDropdown } from "../inputs"
import { ProgressIndicator } from "../progress-indicator/ProgressIndicator"
import { TeamMember } from "../team-member"
import "./SprintGenerator.sass"
import { calculateAvailableDays } from "./SprintGeneratorController"

interface SprintGeneratorProps {
  generateSprint: (numberOfStoryPoints: number) => void,
  sprintTasks: TaskModel[]
}

export function SprintGenerator({ generateSprint, sprintTasks }: SprintGeneratorProps) {

  const { data: teamMembers } = useGetTeamMembersWithAbsences()

  // initial state
  const [maxStoryPoints, setMaxStoryPoints] = useState(0)
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamMemberWithAbsencesModel[]>([])
  const [sprintInterval, setSprintInterval] = useState({start: new Date().toISOString().substring(0, 10), end: new Date().toISOString().substring(0, 10)})

  // create dropdown options only when team members are updated
  // keep reference to dropdownOptions the same
  const dropdownOptions = useMemo(() => {

    if (!teamMembers)
      return []

    return teamMembers.team_members.map((teamMember) => {

      return {

        label: teamMember.name,
        value: teamMember

      }

    })


  }, [teamMembers])

  function updateMaxStoryPoints(sprintInterval: {start: string, end: string}, selectedTeamMembers: TeamMemberWithAbsencesModel[]){
    const storyPoints = calculateAvailableDays(sprintInterval.start, sprintInterval.end, selectedTeamMembers)
    setMaxStoryPoints(storyPoints)
  }

  function onMemberSelectionChange(selectedMembers: TeamMemberWithAbsencesModel[]){
    setSelectedTeamMembers(selectedMembers)
    updateMaxStoryPoints(sprintInterval, selectedMembers)
  }

  function onSprintIntervalChanged(start: string, end: string){
    setSprintInterval({start, end})
    updateMaxStoryPoints({start, end}, selectedTeamMembers)
  }

  // calculate total number of story points in sprint
  const currentStoryPoints = sprintTasks.reduce((total, task) => total + task.story_points, 0)
  const remainingStoryPoints = maxStoryPoints - currentStoryPoints

  return <div className='sprint-generator'>

    <div className="title">
      Create a new sprint
    </div>

    {/* Story point status */}
    {
      <div className='story-points-indicator'>

        <ProgressIndicator progress={(currentStoryPoints / maxStoryPoints) * 100} />
        <div className="remaining-story-points">

          {
            remainingStoryPoints >= 0 
            ? `${remainingStoryPoints} story points remaining` 
            : `Please remove ${Math.abs(remainingStoryPoints)} story points.`
          }

        </div>

      </div>
    }

    {/* inputs */}
    <div className='inputs'>

      <div className='sprint-interval-input'>

        <DateRangeInput rangeSelected={onSprintIntervalChanged} />

      </div>

      <MultiselectDropdown<TeamMemberWithAbsencesModel> selectionChanged={onMemberSelectionChange} options={dropdownOptions} />

    </div>

    {/* selected team members*/}
    <div className='team-members'>

      {
        selectedTeamMembers.slice(0, 3).map((member, index) =>
          <TeamMember member={member} key={index} />
        )
      }

      <div className='team-count-overflow'>
        {
          selectedTeamMembers.length > 3 &&
          <>+{selectedTeamMembers.length - 3} others</>
        }

      </div>

    </div>

    {/* Generate sprint button */}
    <button className='button' disabled={remainingStoryPoints <= 0} onClick={() => generateSprint(remainingStoryPoints)}> Generate sprint </button>

  </div>

}