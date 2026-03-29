function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-64 mb-4"
    />
  );
}

export default SearchBar;