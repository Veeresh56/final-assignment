function SupportTable({ rows }) {
  return (
    <div className="overflow-hidden rounded border border-[#ececec] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="border-b border-[#efefef] bg-white text-[12px] text-[#6a6a6a]">
              <th className="px-4 py-4 font-medium">S. No.</th>
              <th className="px-4 py-4 font-medium">Transaction ID</th>
              <th className="px-4 py-4 font-medium">Reason</th>
              <th className="px-4 py-4 font-medium">Description</th>
              <th className="px-4 py-4 font-medium">Attachment</th>
              <th className="px-4 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-[#f3f3f3] text-[12px] text-[#444]"
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{item.transactionId}</td>
                  <td className="px-4 py-4">{item.reason}</td>
                  <td className="px-4 py-4">{item.description}</td>
                  <td className="px-4 py-4">{item.attachmentName || "-"}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded bg-[#fff4e8] px-2 py-1 text-[11px] font-medium text-[#f59e0b]">
                      Pending
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-[13px] text-[#888]"
                >
                  No tickets raised yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupportTable;