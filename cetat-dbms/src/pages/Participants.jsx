import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

export default function Participants() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <h2>Participants</h2>

      <button onClick={() => navigate("/add-participant")}>
        + Add Participant
      </button>
    </MainLayout>
  );
}