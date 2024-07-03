import { Entity } from "./entity.model"

export interface TaskModel extends Entity{

  name: string
  order: number
  story_points: number
  description: string | null

}