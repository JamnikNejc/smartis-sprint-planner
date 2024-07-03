import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3D5A80",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3D5A80",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3D5A80",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
        },
      },
    },
  },
})

export default theme