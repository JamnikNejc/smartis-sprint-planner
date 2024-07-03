import { Link } from "react-router-dom"
import "./TopBar.sass"

export function TopBar(){

  //const location = useLocation();
  //const contentTitle = location.pathname == '/' ? 'Sprint planner' : 'Team members'

  return <div className="top-bar">

    {/*
      <div className='content-title'>
        {contentTitle}
      </div>
     */}


    <div className='links'>
      <Link to={"/"}>Sprint planner</Link>
      <Link to={"team-members"}>Team members</Link>

    </div>

  </div>

}