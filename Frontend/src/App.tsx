import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Upload from "./pages/Upload"
import Report from "./pages/Report"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

