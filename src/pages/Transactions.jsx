import { useMemo, useState } from "react";
import { storage } from "../utils/storage";
import {
  formatInputDateToDDMMYYYY,
  getLastMonthsRange,
  getTodayRange,
  isFutureDate,
  isStartAfterEnd,
} from "../utils/transactionDates";
import { submitTransactionReportQuery } from "../services/reportApi";
import { exportTransactionsToExcel } from "../utils/transactionExport";
import TransactionFilterCard from "../components/transactions/TransactionFilterCard";
import TransactionSearchBar from "../components/transactions/TransactionSearchBar";
import TransactionTable from "../components/transactions/TransactionTable";

// This page allows users to generate transaction reports based on selected filters (today, last N months, or custom date range). Users can also search within the loaded transactions and download the results as an Excel file.
function Transactions() {
  const selectedProfile = storage.getSelectedProfile();

  const [filterType, setFilterType] = useState("today");
  const [monthlyRange, setMonthlyRange] = useState("3");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const vpaId = selectedProfile?.vpa_id || "";

  const filteredRows = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return tableRows;
    }

    return tableRows.filter((item) =>
      String(item?.Transaction_Id || "")
        .toLowerCase()
        .includes(keyword)
    );
  }, [tableRows, search]);

  const buildPayload = () => {
    if (!vpaId) {
      throw new Error("Selected VPA not found. Please login again.");
    }

    if (filterType === "today") {
      const { startDate: todayStart, endDate: todayEnd } = getTodayRange();

      return {
        startDate: todayStart,
        endDate: todayEnd,
        vpa_id: vpaId,
        mode: "stream",
      };
    }

    if (filterType === "monthly") {
      const { startDate: monthStart, endDate: monthEnd } =
        getLastMonthsRange(monthlyRange);

      return {
        startDate: monthStart,
        endDate: monthEnd,
        vpa_id: vpaId,
        mode: "stream",
      };
    }

    if (!startDate || !endDate) {
      throw new Error("Please select start date and end date.");
    }

    if (isFutureDate(startDate) || isFutureDate(endDate)) {
      throw new Error("Start date and end date cannot be in the future.");
    }

    if (isStartAfterEnd(startDate, endDate)) {
      throw new Error("Start date cannot be greater than end date.");
    }

    return {
      startDate: formatInputDateToDDMMYYYY(startDate),
      endDate: formatInputDateToDDMMYYYY(endDate),
      vpa_id: vpaId,
      mode: "stream",
    };
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");
      setInfoMessage("");

      const payload = buildPayload();
      const response = await submitTransactionReportQuery(payload);

      if (Array.isArray(response?.data)) {
        setTableRows(response.data);
        setCurrentPage(1);
        setInfoMessage(
          `Loaded ${response?.row_count || response.data.length} transactions successfully.`
        );
        return;
      }

      throw new Error("No transaction data found in response.");
    } catch (err) {
      setError(err.message || "Unable to submit report request.");
      setTableRows([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadAll = async () => {
    try {
      setIsDownloading(true);
      setError("");
      setInfoMessage("");

      if (!tableRows.length) {
        throw new Error("No transactions available to download.");
      }

      const fileSuffix =
        filterType === "today"
          ? "today"
          : filterType === "monthly"
          ? `last-${monthlyRange}-months`
          : "custom-range";

      exportTransactionsToExcel(
        tableRows,
        `transactions-${fileSuffix}.xlsx`
      );

      setInfoMessage("Excel download started.");
    } catch (err) {
      setError(err.message || "Unable to download report.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-[28px] font-semibold text-[#1f1f1f]">
        Transaction Reports
      </h1>

      <div className="space-y-4">
        <TransactionFilterCard
          filterType={filterType}
          monthlyRange={monthlyRange}
          startDate={startDate}
          endDate={endDate}
          onFilterTypeChange={setFilterType}
          onMonthlyRangeChange={setMonthlyRange}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        {error ? (
          <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {error}
          </div>
        ) : null}

        {infoMessage ? (
          <div className="rounded border border-[#b7eadb] bg-[#eefaf5] px-4 py-3 text-[13px] text-[#00836C]">
            {infoMessage}
          </div>
        ) : null}

        <div className="rounded border border-[#e8e8e8] bg-white p-4">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <TransactionSearchBar value={search} onChange={setSearch} />

            <button
              type="button"
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className="self-start rounded bg-[#00836C] px-4 py-2 text-[12px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDownloading ? "Downloading..." : "Download All"}
            </button>
          </div>

          <TransactionTable
            rows={filteredRows}
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Transactions;