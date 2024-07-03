import { Box, Container, MenuItem, TextField } from "@mui/material"
import { FormEvent } from "react"
import { AbsenceModel, useGetAbsenceTypes } from "../../../gql"
import { useForm } from "../../../shared/hooks/useForm.hook"
import { absenceTypeToLabel } from "../../../shared/util/absenceTypeToLabel"

export type AbsenceFormData = Pick<AbsenceModel, "start_date" | "end_date" | "team_member_id"> & { absence_type_id: string }

interface AbsenceFormProps {
  absence: Omit<AbsenceFormData, "absence_type_id">,
  onSubmit: (formData: AbsenceFormData) => void
}

export const AbsenceForm = ({ absence, onSubmit }: AbsenceFormProps) => {

  const { data } = useGetAbsenceTypes()
  const absenceTypes = data?.absence_types ?? []

  const { formData, handleChange } = useForm<AbsenceFormData>({
    ...absence,
    absence_type_id: ""
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    
    // submit data only if form is valid
    if(!formData.start_date || !formData.end_date || !formData.absence_type_id)
      return
    
    onSubmit(formData)
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate>

        <TextField fullWidth margin="normal" size="small" variant="outlined" label="Start Date" name="start_date" type="date" required
          error={!formData.start_date} 
          value={formData.start_date}
          onChange={handleChange}
        />
        
        <TextField fullWidth margin="normal" size="small" variant="outlined" label="End Date" name="end_date" type="date" required
          error={!formData.end_date}
          value={formData.end_date}
          onChange={handleChange}
        />

        <TextField fullWidth select margin="normal" size="small" variant="outlined" label="Absence Type" name="absence_type_id" required
          value={formData.absence_type_id}
          error={!formData.absence_type_id}
          onChange={handleChange}
        >
          
          {absenceTypes.map((type) => (
            <MenuItem key={type.type} value={type.id}>
               { absenceTypeToLabel(type.type)}
            </MenuItem>
          ))}

        </TextField>

        <button className="button" type="submit" disabled={!formData.start_date || !formData.end_date || !formData.absence_type_id}>
          Submit
        </button>

      </Box>
    </Container>
  )

}