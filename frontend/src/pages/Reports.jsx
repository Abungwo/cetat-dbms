import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Reports() {
  const [program, setProgram] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("https://cetat-backend.onrender.com/api/programs")
      .then(res => res.json())
      .then(data => setPrograms(data.map(p => p.name)))
      .catch(err => console.error(err));
  }, []);

  const generateReport = async () => {
    try {
      let url = "https://cetat-backend.onrender.com/api/participants/report";

      const params = [];
      if (program) params.push(`program=${program}`);
      if (startDate) params.push(`startDate=${startDate}`);
      if (endDate) params.push(`endDate=${endDate}`);

      if (params.length) url += "?" + params.join("&");

      const res = await fetch(url);
      const participants = await res.json();

      let funders = JSON.parse(localStorage.getItem("funders")) || [];

      funders = funders.filter(f => {
        const d = new Date(f.date);
        const matchProgram = program ? f.program === program : true;
        const matchStart = startDate ? d >= new Date(startDate) : true;
        const matchEnd = endDate ? d <= new Date(endDate) : true;
        return matchProgram && matchStart && matchEnd;
      });

      const funderData = funders.map(f => ({
        _id: Math.random(),
        first_name: f.name,
        last_name: "(Funder)",
        email: "N/A",
        program: f.program,
        status: "Funded",
        amount: Number(f.amount || 0)
      }));

      const combined = [...participants, ...funderData];
      setData(combined);

      if (!combined.length) alert("No data found");

    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    if (!data.length) return;

    const headers = ["Name", "Email", "Program", "Status"];

    const rows = data.map(p => [
      `${p.first_name} ${p.last_name}`,
      p.email,
      p.program,
      p.status
    ]);

    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
  };

  // SUMMARY
  const totalParticipants = data.filter(p => p.status !== "Funded").length;
  const totalFunders = data.filter(p => p.status === "Funded").length;
  const totalFunding = data
    .filter(p => p.status === "Funded")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  // CHART DATA
  const chartData = Object.values(
    data.reduce((acc, p) => {
      acc[p.program] = acc[p.program] || {
        program: p.program,
        participants: 0,
        funders: 0
      };

      if (p.status === "Funded") {
        acc[p.program].funders++;
      } else {
        acc[p.program].participants++;
      }

      return acc;
    }, {})
  );

  return (
    <MainLayout title="Reports">

      <h2 style={{ marginBottom: "20px" }}>Reports Dashboard</h2>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <select value={program} onChange={(e) => setProgram(e.target.value)}>
          <option value="">All Programs</option>
          {programs.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>

        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />

        <button onClick={generateReport} style={btnBlue}>Generate</button>
        <button onClick={exportCSV} style={btnGreen}>Export CSV</button>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
        <Summary title="Participants" value={totalParticipants} />
        <Summary title="Funders" value={totalFunders} />
        <Summary title="Total Funding ($)" value={totalFunding} />
      </div>

      {/* TABLE */}
      {data.length > 0 && (
        <table style={table}>
          <thead style={thead}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Program</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(p => (
              <tr key={p._id}>
                <td>{p.first_name} {p.last_name}</td>
                <td>{p.email}</td>
                <td>{p.program}</td>
                <td style={{ color: p.status === "Funded" ? "green" : "black" }}>
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* CHART */}
      {chartData.length > 0 && (
        <div style={chartBox}>
          <h3>Participants vs Funders</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="program" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="participants" fill="#2563eb" />
              <Bar dataKey="funders" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

    </MainLayout>
  );
}

// COMPONENTS
function Summary({ title, value }) {
  return (
    <div style={summaryBox}>
      <h3 style={{ margin: 0 }}>{value}</h3>
      <p style={{ margin: 0 }}>{title}</p>
    </div>
  );
}

// STYLES
const btnBlue = {
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const btnGreen = {
  padding: "10px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const table = {
  width: "100%",
  background: "white",
  borderRadius: "8px",
  overflow: "hidden"
};

const thead = {
  background: "#111",
  color: "white"
};

const chartBox = {
  marginTop: "30px",
  background: "white",
  padding: "20px",
  borderRadius: "10px"
};

const summaryBox = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  minWidth: "150px",
  textAlign: "center"
};