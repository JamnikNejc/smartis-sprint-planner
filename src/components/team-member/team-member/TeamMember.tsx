import { TeamMemberModel } from "../../../gql"
import avatar from "../../../assets/avatar.png"

import "./TeamMember.sass"

interface TeamMemberProps {
  member: TeamMemberModel
}

export function TeamMember({member}: TeamMemberProps) {

  return <div className='team-member'>

    <img src={avatar} alt="" />
    <div className='name'> {member.name} </div>

  </div>

}