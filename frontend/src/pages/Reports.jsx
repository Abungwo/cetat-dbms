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

  // FETCH PROGRAMS
  useEffect(() => {
    fetch("https://cetat-backend.onrender.com/api/programs")
      .then(res => res.json())
      .then(data => setPrograms(data.map(p => p.name)))
      .catch(err => console.error(err));
  }, []);

  // GENERATE REPORT
  const generateReport = async () => {
    try {
      let url = "https://cetat-backend.onrender.com/api/participants/report";

      const params = [];
      if (program) params.push(`program=${program}`);
      if (startDate) params.push(`startDate=${startDate}`);
      if (endDate) params.push(`endDate=${endDate}`);

      if (params.length) {
        url += "?" + params.join("&");
      }

      const res = await fetch(url);
      const result = await res.json();

      setData(result);

      if (!result.length) {
        alert("No data found for selected filters");
      }

    } catch (err) {
      console.error(err);
    }
  };

  //  EXPORT CSV
  const exportCSV = () => {
    if (!data.length) return;

    const headers = ["Name", "Email", "Program", "Status"];

    const rows = data.map(p => [
      `${p.first_name} ${p.last_name}`,
      p.email,
      p.program,
      p.status
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "participants_report.csv";
    link.click();
  };

  // CHART DATA
  const chartData = Object.values(
    data.reduce((acc, p) => {
      acc[p.program] = acc[p.program] || { program: p.program, count: 0 };
      acc[p.program].count++;
      return acc;
    }, {})
  );

  return (
    <MainLayout title="Reports">

      <h2 style={{ marginBottom: "20px" }}>Reports Dashboard</h2>

      {/* FILTERS */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>
        <select value={program} onChange={(e) => setProgram(e.target.value)}>
          <option value="">All Programs</option>
          {programs.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>

        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />

        <button onClick={generateReport} style={btnBlue}>
          Generate Report
        </button>

        <button onClick={exportCSV} disabled={!data.length} style={btnGreen}>
          Export CSV
        </button>
      </div>

      {/* TABLE */}
      {data.length > 0 && (
        <table style={{
          width: "100%",
          background: "white",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <thead style={{ background: "#111", color: "white" }}>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Program</th>
              <th style={th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p) => (
              <tr key={p._id}>
                <td style={td}>{p.first_name} {p.last_name}</td>
                <td style={td}>{p.email}</td>
                <td style={td}>{p.program}</td>
                <td style={td}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* CHART */}
      {chartData.length > 0 && (
        <div style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h3>Participants by Program</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="program" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

    </MainLayout>
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

const th = {
  padding: "10px",
  textAlign: "left"
};

const td = {
  padding: "10px",
  borderTop: "1px solid #eee"
};