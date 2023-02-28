import { ColorModeContext, useMode } from "./themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Client from "./scenes/client";
import Service from "./scenes/maintenance/service";
import Team from "./scenes/maintenance/team/indexTeam";
import PaymentMethod from "./scenes/maintenance/paymentMethod";
import MeetingStatus from "./scenes/maintenance/meetingStatus";
import MeetingForm from "./scenes/meeting/meetingForm";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/client" element={<Client />} />
              <Route path="/service" element={<Service />} />
              <Route path="/paymentMethod" element={<PaymentMethod />} />
              <Route path="/meetingStatus" element={<MeetingStatus />} />
              <Route path="/team" element={<Team />} />
              <Route path="/meetingForm" element={<MeetingForm />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
