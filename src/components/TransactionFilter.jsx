import { useState } from "react";

function TransactionFilter({ onSubmit }) {
  const [type, setType] = useState("today");
  const [monthRange, setMonthRange] = useState("3");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    onSubmit({ type, monthRange, startDate, endDate });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">

      <p className="text-sm mb-2">Select a Report Filter</p>

      {/* Radio */}
      <div className="flex gap-6 mb-4">
        <label>
          <input type="radio" checked={type==="today"} onChange={()=>setType("today")} />
          Today
        </label>

        <label>
          <input type="radio" checked={type==="monthly"} onChange={()=>setType("monthly")} />
          Monthly
        </label>

        <label>
          <input type="radio" checked={type==="range"} onChange={()=>setType("range")} />
          Custom Range
        </label>
      </div>

      {/* Monthly Dropdown */}
      {type === "monthly" && (
        <div className="flex gap-3">
          <select
            className="border p-2 rounded"
            value={monthRange}
            onChange={(e) => setMonthRange(e.target.value)}
          >
            <option value="1">Last Month</option>
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
            <option value="12">Last 12 Months</option>
          </select>

          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 rounded">
            Submit
          </button>
        </div>
      )}

      {/* Custom Range */}
      {type === "range" && (
        <div className="flex gap-3">
          <input type="date" onChange={(e)=>setStartDate(e.target.value)} />
          <input type="date" onChange={(e)=>setEndDate(e.target.value)} />

          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 rounded">
            Submit
          </button>
        </div>
      )}

      {/* Today */}
      {type === "today" && (
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      )}
    </div>
  );
}

export default TransactionFilter;