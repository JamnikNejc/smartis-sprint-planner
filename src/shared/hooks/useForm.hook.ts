import { useState, ChangeEvent } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForm<T extends Record<string, any>>(initialValues: T){
  const [formData, setFormData] = useState<T>(initialValues)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value
    })
  }

  return {
    formData,
    handleChange,
    setFormData
  }
}
