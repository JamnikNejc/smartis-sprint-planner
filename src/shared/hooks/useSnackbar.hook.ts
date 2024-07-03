import { useState } from "react"

export function useSnackbar(){

  const [open, setOpen] = useState(false)

  const [duration, setDuration] = useState(3000)
  const [message, setMessage] = useState("")
  const [color, setColor] = useState("fff")

  function getColorHex(style: "default" | "positive" | "negative"){

    const colors = {

      "default": "fff",
      "positive": "#4caf50",
      "negative": "#d73a4a"

    }

    return colors[style]

  }

  const closeSnackbar = () => setOpen(false)
  const openSnackbar = (message: string, style: "default" | "positive" | "negative" = "default", duration = 3000) => {
    setOpen(true)
    setMessage(message)
    setDuration(duration)
    setColor(getColorHex(style))
  } 

  return {

    openSnackbar,
    closeSnackbar,
    snackbarProps: {
      sx:{
        "& .MuiPaper-root": {
          backgroundColor: color, 
        },
      },
      anchorOrigin: { vertical: "bottom", horizontal: "center" } as const,
      open,
      message,
      autoHideDuration: duration,
      onClose: closeSnackbar
    }

  }

}