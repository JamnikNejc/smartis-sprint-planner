import { useEffect, useState } from "react"
import "./date-range-input.sass"
import { DateInput } from "../date/DateInput"

interface DateRangInputProps {
  rangeSelected: (start: string, end: string) => void
}

export function DateRangeInput({ rangeSelected }: DateRangInputProps) {

  const [startDate, setStartDate] = useState<string>(new Date().toISOString().substring(0, 10))
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().substring(0, 10))

  // only emit date range if both dates are selected
  useEffect(() => {

    console.log(startDate, endDate)

    if (startDate && endDate)
      rangeSelected(startDate, endDate)

  }, [startDate, endDate])

  return <div className="date-range-input">

    <DateInput valueChanged={(startDate) => setStartDate(startDate)}/>
    <DateInput valueChanged={(endDate) => setEndDate(endDate)}/>

  </div>

}