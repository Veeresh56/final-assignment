import { useState } from "react";

function Dashboard() {
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-sm text-gray-500">
            ID : Pabitra.hota@cbin
          </p>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="border px-4 py-2 rounded bg-white text-sm"
          >
            {selected}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded p-2">
              
              {/* Today */}
              <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  checked={selected === "Today"}
                  onChange={() => {
                    setSelected("Today");
                    setOpen(false);
                  }}
                />
                Today
              </label>

              {/* Yesterday */}
              <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100">
                <input
                  type="radio"
                  checked={selected === "Yesterday"}
                  onChange={() => {
                    setSelected("Yesterday");
                    setOpen(false);
                  }}
                />
                Yesterday
              </label>

            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-6">
        
        <div className="bg-white p-5 rounded shadow flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded">
              🔄
            </div>
            <p className="text-sm text-gray-500">
              Total No Of Transaction
            </p>
          </div>

          <p className="text-xl font-semibold">20.7K</p>
        </div>

        <div className="bg-white p-5 rounded shadow flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded">
              💰
            </div>
            <p className="text-sm text-gray-500">
              Total Amount
            </p>
          </div>

          <p className="text-xl font-semibold">76,000 cr</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;