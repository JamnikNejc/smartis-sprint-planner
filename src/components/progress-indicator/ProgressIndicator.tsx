import "./ProgressIndicator.sass"

interface ProgressIndicatorProps {
  progress: number
}

export function ProgressIndicator({progress}: ProgressIndicatorProps){

  // progress is NaN when maxStoryPoints == 0 and there are no tasks in the sprint
  if(isNaN(progress))
    progress = 100
  // progress is Infinity when maxStoryPoints == 0 and there are tasks in the sprint
  if(progress == Infinity)
    progress = 101

  return <div className='progress-indicator'>

    {/* @ts-expect-error -> --progress is a custom property */}
    <svg style={{"--progress": progress}} width="50" height="50" viewBox="0 0 50 50" className="circular-progress">
      <circle className="bg"></circle>
      <circle className={`${progress > 100 ? "over-limit" : "fg"}`}></circle>
    </svg>

    <div className='progress-text'>
      {
        progress <= 100 &&
        progress.toFixed(0) + "%"
      }
    </div>

  </div>

}