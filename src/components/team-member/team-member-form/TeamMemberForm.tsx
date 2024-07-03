import { Box, Container, TextField } from "@mui/material"
import { FormEvent } from "react"
import { TeamMemberModel } from "../../../gql/models/team-member.model"
import { useForm } from "../../../shared/hooks/useForm.hook"

interface TeamMemberFormProps {
  teamMember: TeamMemberModel,
  onSubmit: (formData: TeamMemberModel) => void
}

export const TeamMemberForm = ({teamMember, onSubmit}: TeamMemberFormProps) => {
  const {formData, handleChange} = useForm<TeamMemberModel>(teamMember)

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // submit only if form is valid
    if(!formData.name)
      return

    onSubmit(formData)
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate>

        <TextField fullWidth margin="normal" size="small" variant="outlined" label="Name" name="name"
          error={!formData.name}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <button className="button" type="submit" disabled={!formData.name}>
          Submit
        </button>

      </Box>
    </Container>
  )
}