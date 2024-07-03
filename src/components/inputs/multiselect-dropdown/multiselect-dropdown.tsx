import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import "./multiselect-dropdown.sass"


interface MultiselectAutocompleteProps<T>{
  options: Option<T>[],
  selectionChanged: (selectedOptions: T[]) => void
}

export type Option<T> = {label: string, value: T}

export function MultiselectDropdown<T>({ options, selectionChanged }: MultiselectAutocompleteProps<T>){

  // convert provided options into dropdown options
  // index will be used to convert back to original values
  const dropdownOptions = options.map((option, index) => {

    return {
      label: option.label,
      index
    }

  })

  const [selectedOptions, setSelectedOptions] = useState<number[]>([])

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    
    const value = event.target.value
    // if multiple values are selected 'value' is an array of indexes
    const selectedOptionIndexes = typeof value === "string" ? value.split(",").map(index => parseInt(index)) : value
    
    // update local state
    setSelectedOptions(selectedOptionIndexes)

    // convert selected dropdown options into original values
    const selectedOptionValues = selectedOptionIndexes.map(index => options[index].value)
    selectionChanged(selectedOptionValues)

  }

  return (
    
    <FormControl fullWidth>
      <InputLabel>Team members</InputLabel>
      <Select className='input' multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<OutlinedInput label="Team members" />}
      >
        {dropdownOptions.map((option) => (
          <MenuItem key={option.index} value={option.index} >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    
  )
}