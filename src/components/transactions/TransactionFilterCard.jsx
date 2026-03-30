// This component provides a user interface for selecting different types of transaction report filters, including "Today", "Monthly", and "Custom Range". Depending on the selected filter type, it displays appropriate input fields for the user to specify the desired date range or monthly range. The component also includes a submit button that triggers the report generation based on the selected filters.

function TransactionFilterCard({
  filterType,
  monthlyRange,
  startDate,
  endDate,
  onFilterTypeChange,
  onMonthlyRangeChange,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
  isSubmitting,
}) {
  return (
    <div className="font-sans rounded border border-[#e8e8e8] bg-white p-4">
      <p className="mb-4 text-[15px] font-medium text-[#8a8a8a]">Select a Report Filter</p>

      <div className="mb-4 flex flex-wrap items-center gap-5 text-[15px] font-medium text-[#444]">
        <label className="flex items-center gap-3 font-bold">
          <input
            type="radio"
            name="report_filter"
            checked={filterType === "today"}
            onChange={() => onFilterTypeChange("today")}
            className="h-4 w-4"
          />
          Today
        </label>

        <label className="flex items-center gap-3 font-bold">
          <input
            type="radio"
            name="report_filter"
            checked={filterType === "monthly"}
            onChange={() => onFilterTypeChange("monthly")}
            className="h-4 w-4"
          />
          Monthly
        </label>

        <label className="flex items-center gap-3 font-bold">
          <input
            type="radio"
            name="report_filter"
            checked={filterType === "range"}
            onChange={() => onFilterTypeChange("range")}
            className="h-4 w-4"
          />
          Custom Range
        </label>
      </div>

      {filterType === "monthly" ? (
        <div className="flex flex-wrap items-end gap-3 font-medium">
          <div>
            <label className="mb-2 block text-[13px] text-[#666] font-medium">Monthly</label>
            <select
              value={monthlyRange}
              onChange={(e) => onMonthlyRangeChange(e.target.value)}
              className="h-[34px] min-w-[140px] rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none font-medium"
            >
              <option className="font-medium" value="1">
                Last 1 Month Report
              </option>
              <option className="font-medium" value="3">
                Last 3 Month Report
              </option>
              <option className="font-medium" value="6">
                Last 6 Month Report
              </option>
              <option className="font-medium" value="12">
                Last 12 Month Report
              </option>
            </select>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded bg-[#00836C] px-4 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      ) : null}

      {filterType === "range" ? (
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-2 block text-[13px] font-medium text-[#666]">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="h-[34px] min-w-[140px] rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] text-[#666] font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="h-[34px] min-w-[140px] rounded border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
            />
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded bg-[#00836C] px-4 py-2 text-[12px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      ) : null}

      {filterType === "today" ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded bg-[#00836C] px-4 py-2 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default TransactionFilterCard;