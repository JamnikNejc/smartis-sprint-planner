import React from "react"
import "./App.sass"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { TopBar } from "./components/top-bar/TopBar"
import { TeamMembersPage } from "./pages/team-members/TeamMembersPage"
import theme from "./shared/theme/mui-theme"

import { ApolloProvider } from "@apollo/client"
import { ThemeProvider } from "@emotion/react"
import { gqlClient } from "./gql/client/gql-client"
import { SprintPlannerPage } from "./pages/sprint-planner/SprintPlannerPage"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"


function App() {

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <ApolloProvider client={gqlClient}>

            <BrowserRouter>

              <TopBar />

              <div className='content'>

                <Routes>
                  <Route path='/team-members' element={<TeamMembersPage />} />
                  <Route path='/' element={<SprintPlannerPage />} />
                  <Route path='*' element={<Navigate to="/" />} />
                </Routes>

              </div>
            </BrowserRouter>

          </ApolloProvider>

        </LocalizationProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
