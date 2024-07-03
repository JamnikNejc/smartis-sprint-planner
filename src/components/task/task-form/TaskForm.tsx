import { Box, Container, TextField } from "@mui/material"
import { FormEvent } from "react"
import { TaskModel } from "../../../gql/models/task.model"
import { useForm } from "../../../shared/hooks/useForm.hook"


interface TaskFormProps{
  task: TaskModel,
  onSubmit: (formData: TaskModel) => void
}

export function TaskForm({task, onSubmit}: TaskFormProps) {

  const {formData, handleChange} = useForm<TaskModel>(task)

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // submit only when form is valid
    if(!formData.name || !formData.order || !formData.story_points)
      return

    onSubmit(formData)
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        
        <TextField fullWidth margin="normal" size="small" variant="outlined" label="Name" name="name"
          value={formData.name}
          onChange={handleChange}
          error={!formData.name}
          required
        />

        <TextField fullWidth margin="normal" size="small" variant="outlined" label="Description" name="description" type='text' 
          value={formData.description ?? ""}
          onChange={handleChange} 
        />

        <TextField fullWidth margin="normal" size="small" variant="outlined" label="Story points" name="story_points" type='number' 
          value={formData.story_points}
          onChange={handleChange}
          error={!formData.story_points}
          required
        />

        <TextField fullWidth margin="normal" size="small" variant="outlined" label="Order" name="order" type='number' 
          value={formData.order}
          onChange={handleChange}
          error={!formData.order}
          required
        />

        <button type="submit" className='button' disabled={!formData.name || !formData.order || !formData.story_points} >
          Submit
        </button>

      </Box>
    </Container>
  )
}