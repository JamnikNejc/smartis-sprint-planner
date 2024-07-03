import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import React, { useState } from "react"

interface DateInputProps {
  valueChanged: (iso: string) => void
}

export const DateInput = ({valueChanged}: DateInputProps) => {

  const [value, setValue] = useState<dayjs.Dayjs>(dayjs())
  function onChange(date: dayjs.Dayjs | null){
    if(!date)
      return

    setValue(date)
    valueChanged(date.toISOString().substring(0, 10))
  }


  return (
    <DatePicker format="DD.MM.YYYY" value={value} onChange={onChange} />
  )
}
