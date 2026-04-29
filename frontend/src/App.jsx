import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Participants from "./pages/Participants";
import AddParticipant from "./pages/AddParticipant";
import Programs from "./pages/Programs";
import Funders from "./pages/Funders";
import Staff from "./pages/Staff";
import Reports from "./pages/Reports";
import EditParticipant from "./pages/EditParticipant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/add-participant" element={<AddParticipant />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/funders" element={<Funders />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/edit-participant/:id" element={<EditParticipant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;