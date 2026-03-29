function TransactionTable({ data }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-left">
          <th>S.No</th>
          <th>Transaction ID</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-b">
            <td>{index + 1}</td>
            <td>{item.Transaction_Id}</td>
            <td>{item.Transaction_Amount}</td>
            <td>{item["Date_&_Time"]}</td>
            <td className="text-green-600">Received</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;