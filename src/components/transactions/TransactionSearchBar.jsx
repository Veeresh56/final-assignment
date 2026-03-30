function TransactionSearchBar({ value, onChange }) {
  return (
    <div className="font-sans w-full max-w-[220px] font-bold">
      <input
        type="text"
        placeholder="Search here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[34px] w-full rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none font-bold"
      />
    </div>
  );
}

export default TransactionSearchBar;