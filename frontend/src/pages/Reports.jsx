import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Reports() {
  const [program, setProgram] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [programs, setPrograms] = useState([]);

  const fetchPrograms = () => {
  fetch("http://localhost:5000/api/programs")
    .then(res => res.json())
    .then(data => {
      setPrograms(data.map(p => p.name));
    })
    .catch(err => console.error(err));
};

  // ✅ Fetch programs dynamically
  useEffect(() => {
  fetchPrograms();
}, []);
  // ✅ Generate report
  const generateReport = async () => {
    try {
      let url = "http://localhost:5000/api/participants/report";

      const params = [];
      if (program) params.push(`program=${program}`);
      if (startDate) params.push(`startDate=${startDate}`);
      if (endDate) params.push(`endDate=${endDate}`);

      if (params.length > 0) {
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

  // ✅ Export CSV
  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Program", "Status"],
      ...data.map((p) => [
        `${p.first_name} ${p.last_name}`,
        p.email,
        p.program,
        p.status,
      ]),
    ];

    const csv =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "report.csv";
    link.click();
  };

  // ✅ Chart data
  const chartData = data.length
    ? Object.values(
        data.reduce((acc, p) => {
          acc[p.program] = acc[p.program] || { program: p.program, count: 0 };
          acc[p.program].count++;
          return acc;
        }, {})
      )
    : [];

  return (
    <MainLayout title="Reports">
      <h2>Generate Report</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "100px" }}>
        <select value={program} onChange={(e) => setProgram(e.target.value)}>
          <option value="">All Programs</option>
          {programs.map((p, index) => (
            <option key={index} value={p}>{p}</option>
          ))}
        </select>

        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />

        <button onClick={generateReport}>
          Generate Report
        </button>

        <button onClick={exportCSV} disabled={!data.length}>
          Download CSV
        </button>
      </div>

      {/* TABLE */}
      <table style={{ width: "100%", background: "white", gap: "10px" }}>
        <thead style={{background: "black", margin: "0px 0px 20px 0px", color: "white"}}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Program</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p._id}>
              <td>{p.first_name} {p.last_name}</td>
              <td>{p.email}</td>
              <td>{p.program}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
              <XAxis dataKey="program" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </MainLayout>
  );
}