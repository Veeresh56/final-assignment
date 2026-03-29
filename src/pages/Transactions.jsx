import { useState } from "react";
import TransactionFilter from "../components/TransactionFilter";
import TransactionTable from "../components/TransactionTable";
import SearchBar from "../components/SearchBar";
import { fetchTransactions } from "../services/transactionApi";
import { getTodayRange } from "../utils/dateUtils";

function Transactions() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const handleFilterSubmit = async (filter) => {
    try {
      let body = {
        vpa_id: "sahil1.iserveu@idbi",
        mode: "both",
      };

      if (filter.type === "today") {
        const { startDate, endDate } = getTodayRange();
        body.startDate = startDate;
        body.endDate = endDate;
        body.mode = "both";
      }

      if (filter.type === "monthly") {
        body.startDate = "01/01/2026";
        body.endDate = "31/01/2026";
        body.mode = "excel";
      }

      if (filter.type === "range") {
        body.startDate = filter.startDate;
        body.endDate = filter.endDate;
        body.mode = "excel";
      }

      const res = await fetchTransactions(body);

      if (res.data) {
        setData(res.data); // show table
      } else if (res.query_id) {
        alert("Report requested successfully");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  const filteredData = data.filter((item) =>
    item.Transaction_Id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Transaction Reports
      </h2>

      <TransactionFilter onSubmit={handleFilterSubmit} />

      <div className="flex justify-between items-center mb-4">
        <SearchBar value={search} onChange={setSearch} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Download All
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <TransactionTable data={filteredData} />
      </div>
    </div>
  );
}

export default Transactions;